<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Game extends CI_Controller
{
    protected $_table = 'game';
    protected $_coupon_game_table = 'coupon_game';
    protected $_points_game_table = 'points_game';
    public $layout_view = 'layout/admin_default';
    public $viewData = array();

    public function __construct()
    {
        parent::__construct();
        $this->viewData['admin_user'] = $this->session->userdata('admin_user');
        $this->load->library('layout');
    }

    public function index()
    {
        $this->load->library('pagination');
        $pageCount = 9;

        $game_type = $this->input->get('game_type')?$this->input->get('game_type'):0;
        $query = $this->db->get_where($this->_table,array('game_type' => $game_type));
        $totalCount = $query->num_rows();

        $config['base_url'] = base_url() . 'admin/game/index/';
        $config['uri_segment'] = 4;
        $offset = (int)$this->uri->segment(4);
        $config['total_rows'] = $totalCount;
        $config['per_page'] = $pageCount;
        $config['first_link'] = 'First';
        $config['last_link'] = 'Last';
        $config['next_link'] = 'Next';
        $config['prev_link'] = 'Prev';

        $this->pagination->initialize($config);

        if($game_type){
            $sql = "select g.*, c.coupon_id from {$this->_table} g left join {$this->_coupon_game_table} c on c.game_id=g.id";
        }
        else{
            $sql = "select g.*, p.request_response from {$this->_table} g left join {$this->_points_game_table} p on p.game_id=g.id";
        }

        $sql .= " where game_type={$game_type} order by g.play_at desc limit ?,?";
        $parameters[] =  $offset;
        $parameters[] =  $pageCount+$offset;
        $paginator = $this->db->query($sql, $parameters)->result();

        $this->viewData['game_list'] = $paginator;
        $this->viewData['total_count'] = $totalCount;
        $this->layout->title('游戏/游戏管理');
        if($game_type){
            $this->layout->view('admin_game_single', $this->viewData);
        }
        else{
            $this->layout->view('admin_game', $this->viewData);
        }
    }

    public function export()
    {
        $game_type = $this->input->get('game_type')?$this->input->get('game_type'):0;
        if($game_type){
            $excel_file_name = '单机游戏';
            $sql = "select g.*, c.coupon_id from {$this->_table} g left join {$this->_coupon_game_table} c on c.game_id=g.id";
        }
        else{
            $excel_file_name = '双屏互动游戏';
            $sql = "select g.*, p.request_response from {$this->_table} g left join {$this->_points_game_table} p on p.game_id=g.id";
        }
        $sql .= " where game_type={$game_type} order by g.play_at desc";
        $query = $this->db->query($sql);
        $this->load->library('excel');
        $this->excel->filename = $excel_file_name;
        $this->excel->make_from_db($query);
    }
}