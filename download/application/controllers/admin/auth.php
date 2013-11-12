<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('SimpleLoginSecure');
    }

    public function login()
    {
        if($this->session->userdata('admin_logged_in')) {
            redirect('admin');
        }

        $message = $this->input->get('message');
        $data['message'] = $message;
        $this->load->view('admin_login_form', $data);
    }

    public function authorize()
    {
        if($this->session->userdata('admin_logged_in')) {
            redirect('admin');
        }

        $user = $this->input->post('username');
        $password = $this->input->post('password');

        // attempt to login
        if($this->simpleloginsecure->login($user, $password)) {
            //success
            redirect('admin');
        }
        else{
            //failed
            redirect('admin/auth/login?message=failed');
        }
    }

    public function update()
    {
        if(!$this->session->userdata('admin_logged_in')) {
            redirect('admin');
        }

        $old = $this->input->post('oldpwd');
        $new1 = $this->input->post('newpwd1');
        $new2 = $this->input->post('newpwd2');

        $result = false;
        $message = 'failed';

        if($old && $new1 && $new2 && $this->simpleloginsecure->validatePass($old) && $new1 == $new2){
            $result = $this->simpleloginsecure->updatePassword($new1);
        }

        if($result){
            $message = 'success';
        }

        redirect('admin/dashboard/password?message=' . $message);

    }

    public function logout()
    {
        $this->simpleloginsecure->logout();
        redirect('admin/auth/login');
    }
}
