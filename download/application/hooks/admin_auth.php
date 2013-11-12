<?php
class Admin_Auth
{
    var $CI;
    function admin_auth(){
        $this->CI = &get_instance();
        $URI = & load_class('URI');
        $url = $URI->uri_string;

        $openUrls = array('admin/auth/login','admin/auth/authorize');

        //echo $url;
        //echo preg_match("/^admin/", $url);die;

        if(preg_match("/^admin/", $url) && !in_array($url,$openUrls)){
            // load the library
            $this->CI->load->library('SimpleLoginSecure');
            // check if logged in
            if(!$this->CI->session->userdata('admin_logged_in')) {
                redirect('admin/auth/login');
            }
        }
    }
}