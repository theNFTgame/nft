<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('core');
        $this->load->helper('game');
    }

    public function register()
    {
        /*$validated = validate_token($this->input->get());
        if(!$validated){
            $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'illegal sign')));
            return;
        }*/

        $email = $this->input->post('email');
        $name = $this->input->post('name');
        $pass = $this->input->post('password');

        if(!$email){
            $email = $this->input->get('email');
        }
        if(!$name){
            $name = $this->input->get('name');
        }
        if(!$pass){
            $pass = $this->input->get('password');
        }

        if(!$email || !$name || !$pass){
            $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'wrong parameters')));
            return;
        }

        $userData = array(
            'mail'          => $email,
            'name'          => $name,
            'pass'          => $pass,
            'gender'        => $this->input->get('gender')?'男':'女',
            'source'        => 'app',
        );

        $userObj = null;
        $is_debug = $this->config->item('debug_environment');
        $userObj = post_request('user_register', $userData, $is_debug);
        if(do_login($userObj)){
            $user_id = $this->session->userdata('user_id');
            $user_name = $this->session->userdata('user_name');
            if($user_id && $user_name){
                $session_id = $this->session->userdata('session_id');
                $game_id = $this->session->userdata('last_game_id');
                /* 先玩游戏才能更新 */
                if($game_id){
                    update_user_profile($user_id, $user_name, $session_id, $game_id);
                }
                return $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'success', 'game_id' => "$game_id", 'user_id' => "$user_id" , 'user_name' => "$user_name",  'message'=>'')));
            }
        }
        $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'register failed')));
    }

    public function login()
    {
        /* $validated = validate_token($this->input->get());
        if(!$validated){
            $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'illegal sign')));
            return;
        }*/

        $email = $this->input->post('email');
        $name = $this->input->post('name');
        $pass = $this->input->post('password');

        if(!$email){
            $email = $this->input->get('email');
        }
        if(!$name){
            $name = $this->input->get('name');
        }
        if(!$pass){
            $pass = $this->input->get('password');
        }

        $loginData = array('pass' => $pass, 'source' => 'app');

        if($pass){
            if($email){
                $loginData['mail'] = $email;
            }
            else if($name){
                $loginData['name'] = $name;
            }
        }

        //print_r($loginData);

        $userObj = null;
        $is_debug = $this->config->item('debug_environment');
        $userObj = post_request('user_login', $loginData, $is_debug);

        //var_dump($userObj);

        if(do_login($userObj)){
            $user_id = $this->session->userdata('user_id');
            $user_name = $this->session->userdata('user_name');
            $user_avatar = $this->session->userdata('user_avatar');
            if($user_id && $user_name){
                $session_id = $this->session->userdata('session_id');
                $game_id = $this->session->userdata('last_game_id');
                $game_id = $game_id?$game_id:'';
                /* 先玩游戏才能更新 */
                if($game_id){
                    update_user_profile($user_id, $user_name, $session_id, $game_id);
                }
                else{

                }
                return $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'success', 'game_id' => "$game_id", 'user_id' => "$user_id" , 'user_name' => "$user_name", 'user_avatar'=>"$user_avatar", 'message'=>'')));
            }
        }
        $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'login failed')));
    }

    public function openid_login()
    {
        $cuid = $this->input->post('cuid');
        $connector = $this->input->post('connector');
        /* 第一次登录时必需，以后即使有值也会忽略，不会重新设置邮箱和用户名 */
        $email = $this->input->post('email');
        $name = $this->input->post('name');
        if(!$cuid){
            $cuid = $this->input->get('cuid');
        }
        if(!$connector){
            $connector = $this->input->get('connector');
        }
        if(!$email){
            $email = $this->input->get('email');
        }
        if(!$name){
            $name = $this->input->get('name');
        }
        $loginData = array('cuid' => $cuid, 'mail' => $email, 'name' => $name, 'connector' => $connector, 'source' => 'app');
        //print_r($loginData);
        $userObj = null;
        $is_debug = $this->config->item('debug_environment');
        $userObj = post_request('user_login', $loginData, $is_debug);
        //var_dump($userObj);
        if(do_login($userObj)){
            $user_id = $this->session->userdata('user_id');
            $user_name = $this->session->userdata('user_name');
            $user_avatar = $this->session->userdata('user_avatar');
            if($user_id && $user_name){
                $session_id = $this->session->userdata('session_id');
                $game_id = $this->session->userdata('last_game_id');
                $game_id = $game_id?$game_id:'';
                /* 先玩游戏才能更新 */
                if($game_id){
                    update_user_profile($user_id, $user_name, $session_id, $game_id);
                }
                else{

                }
                return $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'success', 'game_id' => "$game_id", 'user_id' => "$user_id" , 'user_name' => "$user_name", 'user_avatar'=>"$user_avatar", 'message'=>'')));
            }
        }
        $this->output->set_content_type('application/json')->set_output(json_encode(array('result' => 'failed', 'message'=>'login failed')));
    }

    public function logout()
    {
        $this->session->sess_destroy();
    }

    public function need_login()
    {
        $result['result'] = 'success';
        $result['need_login'] = '1';
        /* 如果用户已登录，从quyeba主站cookie中获取当前登录用户的信息 */
        $current_user_info = $this->input->cookie('user_info');
        if($current_user_info){
            $current_user_info = json_decode($current_user_info, true);
            $user_id =  $current_user_info['uid'];
            $user_name =  $current_user_info['name'];
            $result['need_login'] = '0';
            $result['user_id'] = $user_id;
            $result['user_name'] = $user_name;
        }
        $result['message'] = '';
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }
}
