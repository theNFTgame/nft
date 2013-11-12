<?php if(!defined('BASEPATH')) exit('No direct script access allowed');
class SiteConfig
{
    private $CI;
    public function __construct()
    {
        $this->CI =& get_instance();
        $this->_table = 'config';
        if(!$this->read()) $this->install();
    }

    public function __destruct()
    {
        unset($this->CI);
    }

    public function save($cfg)
    {
        foreach($cfg as $item => $value) {
            $this->CI->config->set_item($item, $value);
        }
        $config =& get_config();
        $this->CI->db->where('id', '1');
        $this->CI->db->update($this->_table, array('cfg' => addslashes(serialize($config))));
        return ($this->CI->db->affected_rows() != 0) ? TRUE : FALSE;
    }

    private function read()
    {
        $this->CI->db->select('cfg')->limit(1);
        $query = $this->CI->db->get($this->_table);
        if($query->num_rows() > 0) {
            $load = $query->row();
            $cfg = unserialize(stripslashes($load->cfg));
            foreach($cfg as $item => $value) $this->CI->config->set_item($item, $value);
            return TRUE;
        }
        return FALSE;
    }

    private function install()
    {
        $config =& get_config();
        $this->CI->db->insert($this->_table, array('id' =>1, 'cfg' => addslashes(serialize($config))));
    }
}
