<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Dashboard extends CI_Controller
{
    public $layout_view = 'layout/admin_default';
    protected $_table = 'game';

    public function index()
    {
        $this->load->library('layout');          // Load layout library
        $this->layout->title('Dashboard/Admin');

        $data['admin_user'] = $this->session->userdata('admin_user');
        $data['admin_last_login'] = $this->session->userdata('admin_user_last_logged_in');

        $this->db->where('game_type',0);
        $this->db->where('to_days(play_at) = to_days(now())');
        $this->db->from($this->_table);
        $today_type_0_game_play_count = $this->db->count_all_results();

        $this->db->where('game_type',1);
        $this->db->where('to_days(play_at) = to_days(now())');
        $this->db->from($this->_table);
        $today_type_1_game_play_count = $this->db->count_all_results();
        $data['i_game_play_count'] = $today_type_0_game_play_count;
        $data['s_game_play_count'] = $today_type_1_game_play_count;

        $this->layout->view('admin_dashboard', $data);
    }

    public function password()
    {
        $this->load->library('layout');          // Load layout library

        $data['admin_user'] = $this->session->userdata('admin_user');
        $data['admin_last_login'] = $this->session->userdata('admin_user_last_login');
        $data['message'] = $this->input->get('message');
        $this->layout->title('安全/游戏管理');

        $this->layout->view('admin_password_form', $data);
    }
}