<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Game extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('core');
        $this->load->helper('coupon');
        $this->load->helper('game');
    }

    /* save game data */
    public function save()
    {
        /*$validated = validate_token($this->input->post());
        if(!$validated){
            $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'illegal sign')));
            return;
        }*/

        $score = $this->input->post('score');
        $game_type = $this->input->post('type'); //0为双屏互动游戏，1为单机游戏。默认为双屏游戏 1
        $game_result = $this->input->post('result');
        $sign = $this->input->get('sign');

        $user_id = null;
        $user_name = null;

        /* 如果用户已登录，从quyeba主站cookie中获取当前登录用户的信息 */
        $current_user_info = $this->input->cookie('user_info');
        if($current_user_info){
            $current_user_info = json_decode($current_user_info, true);
            $user_id =  $current_user_info['uid'];
            $user_name =  $current_user_info['name'];
        }

        /* 如果没有，从请求参数中获得 */
        if(!$user_id){
            $user_id = $this->input->post('user_id');
            $user_name = $this->input->post('user_name');
        }

        if($user_id){
            $this->session->set_userdata(array('user_id'=> $user_id));
        }
        if($user_name){
            $this->session->set_userdata(array('user_name' => $user_name));
        }

        $session_id = $this->session->userdata('session_id');
        $user_id = $this->session->userdata('user_id');;
        $user_name = $this->session->userdata('user_name');
        $client_ip = client_ip();
        $timestamp = date('Y-m-d H:i:s');

        $game_data = array(
            'session_id' => $session_id,
            'user_id'    => $user_id?$user_id:null,
            'user_name'  => $user_name?$user_name:null,
            'game_score' => $score?($score > 0?$score:0):0,
            'game_type'  => $game_type>0?1:0,
            'game_result' => $game_result?$game_result:'lost',
            'client_ip'  => $client_ip,
            'play_at'    => $timestamp,
        );

        $game_id = save_game_data($game_data);

        if($game_id){
            /* 双屏互动游戏 */
            if($game_type == 0){
                if($user_id && $game_result == 'win'){
                    $added_points = 0;
                    $response_data = reward_points_request($user_id);
                    $points_data = json_decode($response_data, true);
                    if(isset($points_data['data'])){
                        if(isset($points_data['data']['integral'])){
                            $added_points = (int)$points_data['data']['integral'];
                        }
                    }
                    save_reward_points($game_id, $user_id, $response_data);
                    $result['point'] = $added_points > 0?'success':'failed';
                }
               else{
                    $result['point'] = 'failed';
                }
            }
            /* 单机游戏 */
            else if($game_type == 1){

            }

            $result['result'] = 'success';
            $result['message'] = '';
            $result['game_id'] = "$game_id";
            $result['user_id'] = $user_id?"$user_id":"";
            $result['user_name'] = $user_name?"$user_name":"";
            /* 将最后一次游戏id存入session */
            $this->session->set_userdata(array('last_game_id' => $game_id));
        }
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    public function reward()
    {
        /* $validated = validate_token($this->input->get());
        if(!$validated){
            $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'illegal sign')));
            return;
        }
        */

        $result['result'] = 'failed';
        $result['message'] = '';
        $session_id = $this->session->userdata('session_id');
        $game_id = $this->session->userdata('last_game_id');
        //if($game_id){
            $user_id = $this->session->userdata('user_id');
            $user_name = $this->session->userdata('user_name');
            $coupon = get_coupon($game_id, $session_id, $user_id?$user_id:null);
            $result['result'] = 'success';
            $result['game_id'] = $game_id?"$game_id":'';
            $result['user_id'] = $user_id?"$user_id":'';
            $result['user_name'] = $user_name?"$user_name":'';
            if($coupon){
                $coupon_id = $coupon['id'];
                $coupon_code = $coupon['coupon_code'];
                $coupon_discount = $coupon['coupon_discount'];
                $coupon_description = $coupon['coupon_description'];
                $result['coupon_id'] = "$coupon_id";
                $result['coupon_code'] = "$coupon_code";
                $result['coupon_discount'] = "$coupon_discount";
                $result['coupon_description'] = "$coupon_description";
            }
            else{
                $result['coupon_id'] = '';
                $result['coupon_code'] = '';
                $result['coupon_discount'] = '';
                $result['coupon_description'] = '';
            }
        //}
        //else{
        //    $result['message'] = 'no game data found';
        //}
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    /* 请求积分 (双屏游戏) */
    public function points()
    {
        /* $validated = validate_token($this->input->get());
        if(!$validated){
            $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'illegal sign')));
            return;
        }*/

        $result['result'] = 'failed';
        $result['message'] = '';

        $game_id = $this->session->userdata('last_game_id');
        if($game_id){
            $user_id = $this->session->userdata('user_id');
            if($user_id){
                $added_points = 0;
                $response_data = reward_points_request($user_id);
                $points_data = json_decode($response_data, true);
                if(isset($points_data['data'])){
                    if(isset($points_data['data']['integral'])){
                        $added_points = (int)$points_data['data']['integral'];
                    }
                }
                $result['result'] = save_reward_points($game_id, $user_id, $response_data)?'success':'failed';
                $result['point'] = $added_points>0?'success':'failed';
            }
        }
        else{
            $result['message'] = 'no game data found';
        }
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }
}