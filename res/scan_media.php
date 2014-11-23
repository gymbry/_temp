<?php
  class scan_media {
    public $url_send;
    public $scan;
    public $output;
    public function __construct ($url_send, $scan) {
  	  $this -> url_send = $url_send;
  	  $this -> scan = $scan;
  	
  	  $json_str = file_get_contents($this -> url_send);
      $data = json_decode($json_str);
      $all = array();
      $videos = array();
      $images = array();
      $webm = array();
      $data -> files -> all = array();
      $data -> files -> images = array();
      $data -> files -> videos = array();
      $data -> files -> webm = array();
      $ffs = scandir($this -> scan);
      
      foreach ($ffs as $ff) {
        if (is_dir($ff) || ($ff === '.DS_Store') || ($ff === '.') || ($ff === '..'));
        else if (strpos(basename($ff), '-1') !== false)
          unlink($this -> scan . '/' . $ff);
        else {
          if (pathinfo($ff, PATHINFO_EXTENSION) === 'mp4') {
            array_push($videos, $ff);
            $temp_obj = new stdClass();
            $temp_obj -> url = $ff;
            $temp_obj -> basename = basename($ff, '.' . pathinfo($ff, PATHINFO_EXTENSION));
            $temp_obj -> ext = pathinfo($ff, PATHINFO_EXTENSION);
            $temp_obj -> type = 'video';
            
            array_push($data -> files -> videos, $temp_obj);
            array_push($data -> files -> all, $temp_obj);
          }
          else if (pathinfo($ff, PATHINFO_EXTENSION) === 'webm') {
            array_push($webm, $ff);
            $temp_obj = new stdClass();
            $temp_obj -> url = $ff;
            $temp_obj -> basename = basename($ff, '.' . pathinfo($ff, PATHINFO_EXTENSION));
            $temp_obj -> ext = pathinfo($ff, PATHINFO_EXTENSION);
            $temp_obj -> type = 'webm';
            
            array_push($data -> files -> webm, $temp_obj);
            array_push($data -> files -> all, $temp_obj);
          }
          else if ((pathinfo($ff, PATHINFO_EXTENSION) === 'png') || (pathinfo($ff, PATHINFO_EXTENSION) === 'gif') || (pathinfo($ff, PATHINFO_EXTENSION) === 'jpg')) {
            array_push($images, $ff);
            $temp_obj = new stdClass();
            $temp_obj -> url = $ff;
            $temp_obj -> basename = basename($ff, '.' . pathinfo($ff, PATHINFO_EXTENSION));
            $temp_obj -> ext = pathinfo($ff, PATHINFO_EXTENSION);
            $temp_obj -> type = 'image';
            
            array_push($data -> files -> images, $temp_obj);
            array_push($data -> files -> all, $temp_obj);
          }
        }
      }
      
      $str_data = json_encode($data, JSON_PRETTY_PRINT);
      file_put_contents($this -> url_send, str_replace('    ', '  ', $str_data));
      
      $this -> output = $data -> files;
    }
    public static function initialize ($url_send, $scan) {
      $json_str = file_get_contents($url_send);
      $data = json_decode($json_str);
      print_r($data);
      /*$all = array();
      $videos = array();
      $images = array();
      $webm = array();
      $data -> files -> all = array();
      $data -> files -> images = array();
      $data -> files -> videos = array();
      $data -> files -> webm = array();
      $ffs = scandir($scan);
      
      foreach ($ffs as $ff) {
        if (is_dir($ff) || ($ff === '.DS_Store') || ($ff === '.') || ($ff === '..'));
        else {
          if (pathinfo($ff, PATHINFO_EXTENSION) === 'mp4') {
            array_push($videos, $ff);
            $temp_obj = new stdClass();
            $temp_obj -> url = $ff;
            $temp_obj -> basename = basename($ff, '.' . pathinfo($ff, PATHINFO_EXTENSION));
            $temp_obj -> ext = pathinfo($ff, PATHINFO_EXTENSION);
            $temp_obj -> type = 'video';
            
            array_push($data -> files -> videos, $temp_obj);
            array_push($data -> files -> all, $temp_obj);
          }
          else if (pathinfo($ff, PATHINFO_EXTENSION) === 'webm') {
            array_push($webm, $ff);
            $temp_obj = new stdClass();
            $temp_obj -> url = $ff;
            $temp_obj -> basename = basename($ff, '.' . pathinfo($ff, PATHINFO_EXTENSION));
            $temp_obj -> ext = pathinfo($ff, PATHINFO_EXTENSION);
            $temp_obj -> type = 'webm';
            
            array_push($data -> files -> webm, $temp_obj);
            array_push($data -> files -> all, $temp_obj);
          }
          else if ((pathinfo($ff, PATHINFO_EXTENSION) !== 'mp4') && (pathinfo($ff, PATHINFO_EXTENSION) !== 'webm')) {
            array_push($images, $ff);
            $temp_obj = new stdClass();
            $temp_obj -> url = $ff;
            $temp_obj -> basename = basename($ff, '.' . pathinfo($ff, PATHINFO_EXTENSION));
            $temp_obj -> ext = pathinfo($ff, PATHINFO_EXTENSION);
            $temp_obj -> type = 'image';
            
            array_push($data -> files -> images, $temp_obj);
            array_push($data -> files -> all, $temp_obj);
          }
        }
      }
      
      $str_data = json_encode($data, JSON_PRETTY_PRINT);
      file_put_contents($url_send, str_replace('    ', '  ', $str_data));*/
    }
  }
?>