<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('upload_attachment')){
	function upload_attachment($fieldname = 'attachment'){
		$uploadedFilepath = '';
		$ci =& get_instance();
		$ci->config->load('uploader_settings', TRUE);
		//upload image
		$config['allowed_types'] = $ci->config->item('allowed_attachment_types', 'uploader_settings');
		$config['encrypt_name'] = $ci->config->item('encrypt_name', 'uploader_settings');
		$config['overwrite'] = $ci->config->item('overwrite', 'uploader_settings');
		$config['upload_path'] = $ci->config->item('attachment_upload_path', 'uploader_settings');
			
			
		$ci->load->library('upload', $config);
		
		if ($ci->upload->do_upload($fieldname))
		{
			$result = $ci->upload->data();
			$uploadedFilepath = $config['upload_path'] . '/' . $result['file_name'];
		}
		else
		{
			//echo $ci->upload->display_errors(' ', '<br />');
			log_message('debug', $ci->upload->display_errors(' ', '<br />'));
		}
		//echo $uploadedFilepath;
		return $uploadedFilepath; 
	}
}