<?php
if (!defined('GAME_DATA_TABLE_NAME')) {
    define('GAME_DATA_TABLE_NAME', 'game');
}
if (!defined('COUPON_DATA_TABLE_NAME')) {
    define('COUPON_DATA_TABLE_NAME', 'coupon');
}
if (!defined('REWARD_DATA_TABLE_NAME')) {
    define('REWARD_DATA_TABLE_NAME', 'reward');
}
if (!defined('COUPON_GAME_DATA_TABLE_NAME')) {
    define('COUPON_GAME_DATA_TABLE_NAME', 'coupon_game');
}
if (!defined('POINTS_GAME_DATA_TABLE_NAME')) {
    define('POINTS_GAME_DATA_TABLE_NAME', 'points_game');
}

function get_coupon($game_id, $session_id, $user_id = null){
    $ci = &get_instance();
    $coupon = null;
    $coupon_per_user = $ci->config->item('coupon_per_user');
    /* 非首次玩 */
    //if(play_count($session_id, $user_id) > 0){
        if(coupon_count($session_id, $user_id) < $coupon_per_user){
            $reward = get_reward();
            foreach($reward as $id=>$name){
                $ci->db->where('status', 0);
                $ci->db->where('reward_id', $id);
                $query = $ci->db->get(COUPON_DATA_TABLE_NAME);
                $result_array = $query->result_array();
                if(!empty($result_array)){
                    $coupon = $result_array[0];
                }
                break;
            }
        }
        else{
            /* 超出优惠券单个用户上限 */
        }
    //}
    /* 首次玩 */
    //else{
        //$coupon = min_discount_coupon();
    //}
    /* 标记为已分配 */
    if(is_array($coupon) && isset($coupon['id'])){
        $coupon['status'] = 1;
        $ci->db->where('id', $coupon['id']);
        $ci->db->update(COUPON_DATA_TABLE_NAME, $coupon);

        /* 保存历史记录表 */
        $ci->db->insert(COUPON_GAME_DATA_TABLE_NAME,
            array('game_id' => $game_id, 'coupon_id' => $coupon['id'], 'session_id' => $session_id, 'user_id' => $user_id)
        );
    }
    //print_r($coupon);
    return $coupon;
}

function play_count($session_id , $user_id = null){
    $count = 0;
    $ci = &get_instance();
    if($user_id){
        $ci->db->where('user_id', $user_id);
        $ci->db->from(GAME_DATA_TABLE_NAME);
    }
    else{
        $ci->db->where('session_id', $session_id);
        $ci->db->from(GAME_DATA_TABLE_NAME);
    }
    $count = $ci->db->count_all_results();
    return $count;
}

function coupon_count($session_id , $user_id = null)
{
    $count = 0;
    $ci = &get_instance();
    $ci->db->where('to_days(created_at) = to_days(now())');
    if($user_id){
        $ci->db->where('user_id', $user_id);
        $ci->db->from(COUPON_GAME_DATA_TABLE_NAME);
    }
    else{
        $ci->db->where('session_id', $session_id);
        $ci->db->from(COUPON_GAME_DATA_TABLE_NAME);
    }
    $count = $ci->db->count_all_results();
    //echo $count;
    return $count;
}

function min_discount_coupon()
{
    $ci = &get_instance();
    $query = $ci->db->get_where(COUPON_DATA_TABLE_NAME, array('status' => 0), 1);
    return $query->row_array();
}

/**
 * 最大支持0.001%，即10万分之1的概率
 * 根据设定的概率给用户一个奖励,奖励完全按照百分比来,如果存在所有奖励概率加起来不足100%的制造一个空奖励给前端显示没有抽中奖励
 * 规则如下:
 * 奖励名称   抽中概率,抽中的范围
 * A          20%                 1     -  20000
 * B          20%             20001 -  40000
 * C          10%            40001 -  50000
 * D          10%            50001 -  60000
 * E          0.001%       60001 -  60002
 * 空奖      39.999%    60003 -  100000
 */
function get_reward(){
    $ci = &get_instance();
    $ci->db->select('id, reward_name as name, reward_probability as probability');
    $query = $ci->db->get(REWARD_DATA_TABLE_NAME);
    //print_r($query->result_array());
    $rs = $query->result_array();
    /*$rs = array();
    $rs[] = array('name'=>'A','probability'=>'20');
    $rs[] = array('name'=>'B','probability'=>'20');
    $rs[] = array('name'=>'C','probability'=>'10');
    $rs[] = array('name'=>'D','probability'=>'10');
    $rs[] = array('name'=>'E','probability'=>'0.001');
    */
    $probability = 0;
    $award = array();
    foreach ($rs as $v){
        $probability += $v['probability']*1000;
        $award[] = array('id' => $v['id'],'num'=>$probability, 'name' => $v['name']);
    }
    /* 当所有奖品的概率加起来不足100000时,制造一个空奖让前端显示没有得奖 */
    if($probability < 100000){
        $award[] = array('id' => '','num'=>100000, 'name' =>'未中奖');
    }
    /* 返回给客户端的奖品名称 */
    $return = array('id' => '','name' =>'未中奖');
    $rand = rand(1,100000);

    foreach ($award as $key => $val){
        if(isset($award[$key - 1])){
            if($rand > $award[$key -1]['num'] && $rand <= $val['num']){
                $return = array($val['id'] => $val['name']);
                break;
            }
        }else{
            if($rand > 0 && $rand <= $val['num']){
                $return = array($val['id'] => $val['name']);
                break;
            }
        }
    }
    return $return;
}

function save_reward_points($game_id, $user_id, $data)
{
    $result = false;
    if($game_id && $user_id){
        $ci = &get_instance();
        $ci->db->insert(POINTS_GAME_DATA_TABLE_NAME, array('game_id' => $game_id, 'user_id' => $user_id, 'request_response' => $data));
        $result = true;
    }
    return $result;
}

/**
 * 最大支持0.001%，即10万分之1的概率
 * 根据设定的概率给玩家一个奖励,奖励完全按照百分比来,只要有奖励没有没抽完，那么中奖概率都是100%,直到奖励抽完
 * 例子:
 * 预设爆率是A 30%，B 40%，C 30%，
 * C奖抽完之后，剩下的概率加起来比如是70%，A奖就应该是30%/70%=42.857%，B奖就该是40%/70%=57.143%
 * 规则如下:
 * 奖励名称 抽中概率   抽中的范围
 * A           90%      1 -  90000
 * B           4.5%     90001-94500
 * C           4.5%     94501-99000
 * D           1%       99001-100000
 */
/* function get_reward2(){
    $rs = array();
    $rs[] = array('name'=>'A','probability'=>'90');
    $rs[] = array('name'=>'B','probability'=>'4.5');
    $rs[] = array('name'=>'C','probability'=>'4.5');
    $rs[] = array('name'=>'D','probability'=>'1');
    $probability = 0;
    $award = array();
    foreach ($rs as $v){
        //将概率乘以1000来支持10万分之1的概率
        $probability += $v['probability'] * 1000;
        //存放奖品名称和概率
        $award[] = array('name' => $v['name'],'num'=>$probability);
    }
    //在有些类型的奖励抽完后，剩余奖励的按照概率来分配抽完的奖励的概率
    foreach ($award as $ke=>$aw){
        $award[$ke]['num'] = ($aw['num'] / $probability) * 100000;
    }

    print_r($award);

    //返回给客户端的奖品名称
    $return = '';
    $rand = rand(1,100000);

    foreach ($award as $key => $val){
        //如果不是数组中的第一个奖励,中奖范围是上一个奖励临界值+1到当前奖励的临界值
        if(isset($award[$key - 1])){
            if($rand > $award[$key -1]['num'] && $rand <= $val['num']){
                $return = $val['name'];
                break;
            }
        }else{
            //如果是数组中的第一个奖励,他的范围是从0开始的
            if($rand > 0 && $rand <= $val['num']){
                $return = $val['name'];
                break;
            }
        }
    }
    return $return;
}
*/

