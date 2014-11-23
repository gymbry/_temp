<?php
  $links_data = $_POST['formData'];
  $url_send = "../res/settings.json";
  $json_str = file_get_contents($url_send);
  $json = json_decode($json_str);
  foreach($links_data as $linksKey => $src) {
    foreach($src as $srcKey => $item) {
      if ($item -> delete === true)
        unset($links_data[$linksKey][$srcKey]);
    }
  }
  $json -> links = $links_data;

  $str_json = json_encode($json, JSON_PRETTY_PRINT);
  file_put_contents($url_send, $str_json);
?>