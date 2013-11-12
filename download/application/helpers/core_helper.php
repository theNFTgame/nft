<?php
function access_token($data){
    $ci = &get_instance();
    $key = $ci->config->item('encryption_key');
    $token = '';
    if(!is_array($data)){
        $token = md5($key);
    }
    else{
        foreach($data as $key => $value) {
            if('sign' != $key){
                $token.= $key.$value;
            }
        }
        $token = md5($token . $key);
    }

    echo $token;
    return $token;
}

function validate_token($params)
{
    $ci = &get_instance();
    $validateEnabled = $ci->config->item('enable_validate_sign');
    if(!$validateEnabled){
        return true;
    }

    $result = false;
    if(is_array($params) && isset($params['sign'])){
        $result = access_token($params) == $params['sign'];
    }
    return $result;
}

function post_request($api, $data, $debug = true)
{
    $ci = &get_instance();
    if($debug){
        $client = $ci->config->item('debug_quyeba_client');
        $clientKey = $ci->config->item('debug_quyeba_client_key');
        $apiUrl = $ci->config->item('debug_quyeba_api_url');
    }
    else{
        $client = $ci->config->item('quyeba_client');
        $clientKey = $ci->config->item('quyeba_client_key');
        $apiUrl = $ci->config->item('quyeba_api_url');
    }
    $apiRequestUrl = $apiUrl . $api . '.json?client=' .$client. '&signature=' . md5($clientKey . json_encode($data));
    //echo $apiRequestUrl;
    $ci->curl->create($apiRequestUrl);
    $ci->curl->option(CURLOPT_HTTPHEADER, array('Content-type:application/json'));
    $ci->curl->post(json_encode($data));
    $response = $ci->curl->execute();
    //print_r($ci->curl->info);
    $response = $response?json_decode($response):false;
    //var_dump($response);
    return $response;
}

function reward_points_request($user_id)
{
    $response = false;
    if($user_id){
        $ci = &get_instance();
        $apiUrl = $ci->config->item('reward_points_api_url');
        $apiKey = $ci->config->item('reward_points_api_key');
        $sign = md5('game' . $user_id . $apiKey);
        $postData = array('action' => 'game', 'uid' => $user_id, 'sign' => $sign);
        $ci->curl->create($apiUrl);
        $ci->curl->post($postData);
        $response = $ci->curl->execute();
        $response = $response?$response:false;
    }
    return $response;
}

function read_csv($file_path, $mappedFields = array(), $skip_first_row = true)
{
    $csvFile = fopen($file_path, 'r');
    $row = 0;
    $csvData = false;
    if($csvFile !== false){
        while (($data = fgetcsv($csvFile, 1000, ",")) !== FALSE) {
            $mappedData = array();
            if($skip_first_row && $row == 0){
                $row++;
                continue;
            }
            foreach($mappedFields as $num => $field){
                $mappedData[$field] = $data[$num];
            }
            $csvData[] = $mappedData;
            $row++;
        }
        fclose($csvFile);
    }
    return $csvData;
}

function client_ip()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
        $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
        $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

function do_login($user_object)
{
    $result = false;
    //var_dump($user_object);
    if(is_object($user_object) && isset($user_object->user)){
        $ci = &get_instance();
        $user_id = $user_object->user->uid .'';
        $user_name = $user_object->user->name .'';
        $user_avatar = '';
        $user_avatar_data = null;
        if(is_object($user_object->user->field_avatar)){
            $user_avatar_data = $user_object->user->field_avatar->und;
        }
        if(is_array($user_avatar_data) && count($user_avatar_data)>0){
            $user_avatar = $user_avatar_data[0]->value .'';
        }
        if($user_id && $user_name){
            $user_data = array('user_id' => $user_id , 'user_name' => $user_name, 'user_avatar' => $user_avatar);
            $ci->session->set_userdata($user_data);
            $ci->session->set_userdata($user_data);
            $result = true;
        }
    }
    return $result;
}