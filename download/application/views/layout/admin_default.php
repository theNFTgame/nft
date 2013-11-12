<!doctype html>
<html lang="cn">

<head>
	<meta charset="utf-8"/>
	<title><?php echo $title_for_layout?></title>
	
	<link rel="stylesheet" href="<?php echo base_url()?>css/layout.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url()?>css/jquery-ui.css" type="text/css" media="screen" />
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="<?php echo base_url()?>js/jquery-1.8.2.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>js/jquery-ui-1.9.1.custom.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>js/hideshow.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>js/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php echo base_url()?>js/jquery.equalHeight.js"></script>
	<script type="text/javascript" src="<?php echo base_url()?>js/vanadium.js"></script>
	<script type="text/javascript">
	$(document).ready(function() 
    	{ 
      	  $(".tablesorter").tablesorter(); 
   	 } 
	);
	$(document).ready(function() {

	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});

});
    </script>
    <script type="text/javascript">
    $(function(){
        $('.column').equalHeight();
    });
</script>
    
<script>
  $(function() {
	  //var dateFormat = $( ".datepicker" ).datepicker( "option", "dateFormat" );
      $(".datepicker" ).datepicker( { dateFormat: "yy-mm-dd" } );
  });
</script>

</head>


<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="<?php echo base_url()?>admin">游戏管理</a></h1>
		</hgroup>
	</header> <!-- end of header bar -->
	
	<section id="secondary_bar">
		<div class="user">
			<p><?php echo $admin_user?>&nbsp;&nbsp;&nbsp;&nbsp;<?php echo unix_to_human(time())?>  <!-- (<a href="#">3 Messages</a>) --></p>
			<a class="logout_user" href="<?php echo base_url()?>admin/auth/logout" title="Logout">Logout</a>
		</div>
		<div class="breadcrumbs_container">
			<article class="breadcrumbs"><a href="<?php echo base_url()?>admin">游戏管理</a> <div class="breadcrumb_divider"></div> <?php $this->layout->block('breadcrumbs')?><?php $this->layout->block()?></article>
		</div>
	</section><!-- end of secondary bar -->
	
	<aside id="sidebar" class="column">
<!-- 		<form class="quick_search"> -->
<!-- 		<input type="text" value="Quick Search" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;"> -->
<!-- 		</form> -->
<!-- 		<hr/> -->
		<h3>游 戏</h3>
		<ul class="toggle">
			<li class="icn_categories"><?php $this->layout->block('game_history')?><a href="<?php echo base_url()?>admin/game">互动游戏</a><?php $this->layout->block()?></li>
            <li class="icn_categories"><?php $this->layout->block('game_history_single')?><a href="<?php echo base_url()?>admin/game?game_type=1">单机游戏</a><?php $this->layout->block()?></li>
		</ul>
		<h3>奖 项</h3>
		<ul class="toggle">
			<li class="icn_categories"><?php $this->layout->block('reward')?><a href="<?php echo base_url()?>admin/reward">查看</a><?php $this->layout->block()?></li>
            <li class="icn_new_article"><?php $this->layout->block('reward_new')?><a href="<?php echo base_url()?>admin/reward/create">新增</a><?php $this->layout->block()?></li>
		</ul>
        <h3>优惠券</h3>
        <ul class="toggle">
            <li class="icn_categories"><?php $this->layout->block('coupon')?><a href="<?php echo base_url()?>admin/coupon">查看</a><?php $this->layout->block()?></li>
        </ul>
        <h3>管 理</h3>
        <ul class="toggle">
            <li class="icn_new_article"><?php $this->layout->block('settings')?><a href="<?php echo base_url()?>admin/config">设置</a><?php $this->layout->block()?></li>
        </ul>
		<h3>安 全 </h3>
		<ul class="toggle">
			<li class="icn_security"><?php $this->layout->block('security')?><a href="<?php echo base_url()?>admin/dashboard/password">修改密码</a><?php $this->layout->block()?></li>
			<li class="icn_jump_back"><a href="<?php echo base_url()?>admin/auth/logout">注销</a></li>
		</ul>
		
		<footer>
			<hr />
			<p><strong>Copyright &copy; 2013 </strong></p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
		</footer>
	</aside><!-- end of sidebar -->
	
	<?php echo $content_for_layout?>

</body>

</html>