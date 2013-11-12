<?php
class Reward extends CI_Controller
{
    protected $_table = 'reward';
    protected $_coupon_table = 'coupon';
    public $layout_view = 'layout/admin_default';
    public $viewData = array();

    public function __construct()
    {
        parent::__construct();
        $this->viewData['admin_user'] = $this->session->userdata('admin_user');
        $this->load->library('layout');
        $this->load->helper('core');
    }

    public function index()
    {
        $sql = "select r.*, count(c.id) as coupon_count from {$this->_table} as r left join {$this->_coupon_table} as c on r.id = c.reward_id";
        $sql .= " group by r.id order by reward_probability desc";
        $reward_list = $this->db->query($sql)->result();
        $this->viewData['reward_list'] = $reward_list;
        $this->layout->title('奖项/游戏管理');
        $this->layout->view('admin_reward', $this->viewData);
    }

    public function save()
    {
        $reward_id = $this->input->post('reward_id');
        $reward_name = $this->input->post('reward_name');
        $reward_probability = $this->input->post('reward_probability');

        if($reward_name && $reward_probability){
            if($reward_id){
                $this->db->where('id' , $reward_id);
                $this->db->update($this->_table , array('reward_name' => $reward_name, 'reward_probability' => $reward_probability));
            }
            else{
                $this->db->insert($this->_table, array('reward_name' => $reward_name, 'reward_probability' => $reward_probability));
            }
        }
        redirect('admin/reward');
    }

    public function upload()
    {
        $reward_id = $this->input->post('reward_id');
        if($reward_id = (int)$this->input->get('reward_id')){
            $reward = $this->db->get_where($this->_table, array('id' => $reward_id));
            $this->viewData['reward'] = $reward->row();
        }
        $this->layout->title('导入优惠券/游戏管理');
        $this->layout->view('admin_reward_import_new', $this->viewData);
    }

    public function import()
    {
        $reward_id = $this->input->get('reward_id');
        $force_update = $this->input->post('force_update');
        $this->load->helper('attachment_upload_helper');
        $uploaded_filepath = upload_attachment();
        if($uploaded_filepath){
            //echo 'uploaded path:'. $uploaded_filepath;
            $csv_data = read_csv($uploaded_filepath, array('coupon_code', 'coupon_discount'));
            $coupon_data = null;
            foreach($csv_data as $row){
                $row['reward_id'] = $reward_id;
                if($force_update){
                    $this->db->delete($this->_coupon_table, array('coupon_code' =>$row['coupon_code']));
                    $coupon_data[] = $row;
                }
                else{
                    $this->db->where(array('coupon_code'=> $row['coupon_code']));
                    $this->db->from($this->_coupon_table);
                    $exists = $this->db->count_all_results();
                    if(!$exists){
                        $coupon_data[] = $row;
                    }
                }
            }
            //print_r($coupon_data);
            if($coupon_data){
                $this->db->insert_batch($this->_coupon_table, $coupon_data);
            }
        }
        redirect('admin/reward');
    }

    public function create()
    {
        if($reward_id = (int)$this->input->get('reward_id')){
            $reward = $this->db->get_where($this->_table, array('id' => $reward_id));
            $this->viewData['reward'] = $reward->row();
        }

        $this->layout->title('新增奖项/游戏管理');
        $this->layout->view('admin_reward_new', $this->viewData);
    }

    public function delete()
    {
        $reward_id = (int)$this->input->get('reward_id');
        if($reward_id){
            $this->db->delete($this->_table, array('id' => $reward_id));
        }
        redirect('admin/reward');
    }
}