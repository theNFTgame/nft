<?php
if (!defined('GAME_DATA_TABLE_NAME')) {
    define('GAME_DATA_TABLE_NAME', 'game');
}

/* 保存游戏记录，此时用户可能是登录或非登录状态 */
function save_game_data($game_data){
    $ci = &get_instance();
    $ci->db->insert(GAME_DATA_TABLE_NAME , $game_data);
    $game_id = $ci->db->insert_id();
    return $game_id;
}

/* 游戏完成记录保存后，用户登录或者注册后完善用户资料 */
function update_user_profile($user_id, $user_name, $session_id, $game_id){
    $ci = &get_instance();
    $user_data = array('user_id' => $user_id, 'user_name' => $user_name);
    $ci->db->where('session_id', $session_id);
    $ci->db->where('id', $game_id);
    $ci->db->where('user_id', null);
    $ci->db->where('user_name', null);
    $ci->db->update(GAME_DATA_TABLE_NAME, $user_data);
}
