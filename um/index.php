<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="update,items,updateitems,update items,update_items,stache,update_media,media,update media">
<title>add_items</title>
<?php include_once('../res/import_favicons.php'); ?>
<style>summary{outline:0;cursor:pointer;user-select:none;-webkit-user-select:none;}ul{height:500px;width:600px;overflow-y:scroll;}</style>
</head>
<body>
<?php
require_once('../res/scan_media.php');
scan_media::initialize('../res/settings.json', '../media');?>
<!--/*$j = new scan_media('../res/settings.json', '../media');

foreach ($j -> output as $key => $value) {
  if ($key !== 'all') {
    echo '<details><summary>' . $key . '</summary><ul>';
    foreach ($value as $file)
  	echo '<li><a target="_blank" href="../media/' . $file -> url . '">' . $file -> basename . '.' . $file -> ext . '</a></li>';
    echo '</ul></details>';
    echo '<br />';
  }
}*/-->


<br /><a href="../">/_temp</a>
</body>
</html>