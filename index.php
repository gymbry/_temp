<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="keywords" content="temp,_temp,stache">
  <title>stache</title>
  <?php
    require_once('res/scan_media.php');
    scan_media::initialize('./res/settings.json', 'media');

    require_once('res/import_favicons.php');
  ?>

  <link rel="stylesheet" type="text/css" href="res/bower_components/normalize-css/normalize.css" />
  <link rel="stylesheet" type="text/css" href="res/bower_components/font-awesome/css/font-awesome-min.css" />
  <link rel="stylesheet" type="text/css" href="res/min/style-min.css" />
  <script type="text/javascript" src="res/bower_components/jquery/dist/jquery.js"></script>
  <script type="text/javascript" src="res/random.js"></script>
  <script type="text/javascript" src="res/script.js"></script>
</head>
<body>
  <form name="tabs" id="tabs" class="segmented">
    <input type="radio" name="media" value="images" id="images" />
    <label for="images">
      images
    </label>

    <input type="radio" name="media" value="all" id="all" />
    <label for="all">
      all
    </label>

    <input type="radio" name="media" value="videos" id="videos" />
    <label for="videos">
      videos
    </label>

    <input type="radio" name="media" value="webm" id="webm" />
    <label for="webm">
      webm
    </label>
  </form>
  <div id="content"></div>
  <div id="functions">
    <table>
      <!--<form id="localSearch" name="localSearch">
        <input type="search" name="goToFile" id="goToFile" />
        <input type="submit" name="submit" value="submit" />
        <br />
        <ul></ul>
      </form>-->
      <tr>
        <td colspan="2">
          <input type="button" value="Update JSON File" id="updateJSON" name="updateJSON" />
        </td>
      </tr>
      <tr><td colspan="2"></td></tr>
      <tr><td colspan="2"><button id="over_18">Confirm Over 18</button></td></tr>
      <!--<tr><td colspan="2"></td></tr>
      <tr>
        <th colspan="2">
          <p>Auto stepper</p>
        </th>
      </tr>
      <tr>
        <form id="autoShuffle" name="autoShuffle">
          <td>
            <input type="number" name="time" id="time" min="1" max="10" required="true" value="2" /> sec
          </td>
          <td>
            <input type="submit" name="start" value="start" style="display: block;" /><input type="button" name="stop" value="stop" style="display: none;" />
          </td>
        </form>
      </tr>-->
      <tr><td colspan="2"></td></tr>
      <tbody>
        <tr>
          <th colspan="2">
            <p>Toggle safety</p>
          </th>
        </tr>
        <tr>
          <td colspan="2">
            <div class="switch">
              <input type="checkbox" id="toggleSafety" name="toggleSafety" />
              <label for="toggleSafety">
                <i class="fa fa-check"></i>
                <i class="fa fa-times"></i>
                <div></div>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
      <tr><td colspan="2"></td></tr>
      <tbody>
        <tr>
          <th colspan="2">
            <p>Toggle links</p>
          </th>
        </tr>
        <tr>
          <td colspan="2">
            <div class="switch">
              <input type="checkbox" id="toggleLinks" name="toggleLinks" />
              <label for="toggleLinks">
                <i class="fa fa-check"></i>
                <i class="fa fa-times"></i>
                <div></div>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
      <tr><td colspan="2"></td></tr>
      <tr>
        <td colspan="2">
          <input type="button" value="Clear Data" id="clearData" name"clearData" />
        </td>
      </tr>
      <tr><td colspan="2"></td></tr>
      <tbody id="shortcuts">
        <tr>
          <th colspan="2">
            <p>Shortcuts</p>
          </th>
        </tr>
        <tr title="Right/Left Arrow">
          <td>
            <dfn>Next/Back media</dfn>
          </td>
          <td>
            <kbd><i class="fa arw-right"></i><br /><i class="fa arw-left"></i></kbd>
          </td>
        </tr>
        <tr title="Control Alt Right/Left Arrow">
          <td>
            <dfn>Next/Previous tab</dfn>
          </td>
          <td>
            <kbd><i class="fa ctrl"></i><i class="fa alt"></i><i class="fa arw-right"></i><br /><i class="fa ctrl"></i><i class="fa alt"></i><i class="fa arw-left"></i></kbd>
          </td>
        </tr>
        <tr title="Command Click">
          <td>
            <dfn>Open tab in new window</dfn>
          </td>
          <td>
            <kbd><i class="fa cmd"></i><code>.click(tab)</code></kbd>
          </td>
        </tr>
        <tr title="Enter">
          <td>
            <dfn>Toggle links</dfn>
          </td>
          <td>
            <kbd><code>Enter</code></kbd>
          </td>
        </tr>
        <tr title="Escape">
          <td>
            <dfn>Hide links</dfn>
          </td>
          <td>
            <kbd><code>esc</code></kbd>
          </td>
        </tr>
        <tr title="Control/Alt D">
          <td>
            <dfn>Toggle functions</dfn>
          </td>
          <td>
            <kbd><i class="fa ctrl"></i>/<i class="fa alt"></i><code>D</code></kbd>
          </td>
        </tr>
        <tr title="Control/Alt Num">
          <td>
            <dfn>Go to tab between 1 and <code>tabs.length</code></dfn>
          </td>
          <td>
            <kbd><i class="fa ctrl"></i>/<i class="fa alt"></i><code>(number)</code></kbd>
          </td>
        </tr>
        <tr title="Control/Alt Shift C/R">
          <td>
            <dfn>Clear cache and reload</dfn>
          </td>
          <td>
            <kbd><i class="fa ctrl"></i>/<i class="fa alt"></i><i class="fa shift"></i><code>C</code>/<code>R</code></kbd>
          </td>
        </tr>
        <tr title="Alt Shift Space">
          <td>
            <dfn>Toggle safety</dfn>
          </td>
          <td>
            <kbd><i class="fa alt"></i><i class="fa shift"></i><code>(space)</code></kbd>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr><td colspan="2"></td></tr>
        <tr>
          <td colspan="2">
            <form name="search" id="search">
              <input type="search" list="files" />
              <datalist id="files"></datalist>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <iframe src="links/index.html" id="links"></iframe>
</body>
</html>