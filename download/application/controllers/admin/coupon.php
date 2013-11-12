<?php
class Coupon extends CI_Controller
{
    protected $_table = 'coupon';
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

        $totalCount = $this->db->count_all($this->_table);


        $config['base_url'] = base_url() . 'admin/coupon/index/';
        $config['uri_segment'] = 4;
        $offset = (int)$this->uri->segment(4);
        $config['total_rows'] = $totalCount;
        $config['per_page'] = $pageCount;
        $config['first_link'] = 'First';
        $config['last_link'] = 'Last';
        $config['next_link'] = 'Next';
        $config['prev_link'] = 'Prev';

        $this->pagination->initialize($config);


        $sql = "select * from {$this->_table}";
        $sql .= " order by coupon_code desc limit ?,?";
        $parameters[] =  $offset;
        $parameters[] =  $pageCount+$offset;
        $paginator = $this->db->query($sql, $parameters)->result();

        $this->viewData['coupon_list'] = $paginator;
        $this->viewData['total_count'] = $totalCount;
        $this->layout->title('优惠券/游戏管理');
        $this->layout->view('admin_coupon', $this->viewData);
    }

    public function delete()
    {
        $coupon_id = (int)$this->input->get('coupon_id');
        if($coupon_id){
            $this->db->delete($this->_table, array('id' => $coupon_id));
        }
        redirect('admin/coupon');
    }

    public function truncate()
    {
        $this->db->truncate($this->_table);
        redirect('admin/coupon');
    }
}