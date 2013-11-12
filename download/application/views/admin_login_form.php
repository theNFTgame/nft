<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8"/>
	<title>Admin Login</title>
	<link rel="stylesheet" href="<?php echo base_url()?>css/layout.css" type="text/css" media="screen" />
	<script src="<?php echo base_url()?>js/jquery-1.8.2.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php echo base_url()?>js/vanadium.js"></script>
</head>
<body>
	<section id="main" class="column">
		<?php if($message):?>
			<h4 class="alert_error">The username or password you entered is incorrect.</h4>
		<?php endif;?>
		<article class="module width_full">
			<form action="<?php echo base_url()?>admin/auth/authorize" method="post">
			<header><h3>Login</h3></header>
				<div class="module_content">
						<fieldset>
							<label style="width:16%">User:</label>
							<input type="text" name="username" id="checkempty" class=":required" style="width:40%">
						</fieldset>
						<fieldset>
							<label style="width:16%">Password:</label>
							<input type="password" name="password" id="checkempty" class=":required" style="width:40%">
							<div class="clear"></div>
						</fieldset>
				</div>
			<footer>
				<div class="submit_link">
					<input type="submit" value="Login" class="alt_btn">
				</div>
			</footer>
			</form>
		</article><!-- end of post new article -->
	</section>
</body>