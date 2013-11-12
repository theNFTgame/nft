<?php
class Config extends CI_Controller
{
    public $layout_view = 'layout/admin_default';
    public function __construct()
    {
        parent::__construct();
        $this->viewData['admin_user'] = $this->session->userdata('user');
        $this->load->library('layout');
    }

    public function index()
    {
        $message = $this->input->get('message');
        $this->viewData['base_url'] = $this->config->item('base_url');
        $this->viewData['sess_expiration'] = $this->config->item('sess_expiration');
        $this->viewData['coupon_per_user'] = $this->config->item('coupon_per_user');
        $this->viewData['debug_environment'] = $this->config->item('debug_environment');

        $this->viewData['debug_quyeba_api_url'] = $this->config->item('debug_quyeba_api_url');
        $this->viewData['quyeba_api_url'] = $this->config->item('quyeba_api_url');

        $this->viewData['debug_quyeba_client'] = $this->config->item('debug_quyeba_client');
        $this->viewData['quyeba_client'] = $this->config->item('quyeba_client');

        $this->viewData['debug_quyeba_client_key'] = $this->config->item('debug_quyeba_client_key');
        $this->viewData['quyeba_client_key'] = $this->config->item('quyeba_client_key');

        $this->layout->title('设置/游戏管理');
        $this->layout->view('admin_config', $this->viewData);
    }

    public function save()
    {
        $config_data = $this->input->post();
        $this->siteconfig->save($config_data);
        redirect('admin/config/');
    }

}