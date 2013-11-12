<?php $this->layout->block('header')?>
修改密码
<?php $this->layout->block()?>
<?php $this->layout->block('breadcrumbs')?>
<a class="current">修改密码</a>
<?php $this->layout->block()?>
<?php $this->layout->block('security')?>
<li class="icn_security"><a href="#" style="color:orangered">修改密码</a></li>
<?php $this->layout->block()?>

	<section id="main" class="column">
		<?php if($message == 'failed'):?>
			<h4 class="alert_error">Password not match.</h4>
		<?php elseif($message == 'success'):?>
			<h4 class="alert_success">Password updated.</h4>
		<?php endif;?>
		<article class="module width_full">
			<form action="<?php echo base_url()?>admin/auth/update" method="post">
			<header><h3>修改密码</h3></header>
				<div class="module_content">
						<fieldset>
							<label>原密码</label>
							<input type="password" name="oldpwd">
						</fieldset>
						<fieldset>
							<label>新密码</label>
							<input type="password" name="newpwd1">
						</fieldset>
						<fieldset>
							<label>重复输入新密码</label>
							<input type="password" name="newpwd2">
						</fieldset>
				</div>
			<footer>
				<div class="submit_link">
					<input type="submit" value="Save" class="alt_btn">
				</div>
			</footer>
			</form>
		</article>
		<!-- end of post new article -->
		<div class="spacer"></div>
	</section>

