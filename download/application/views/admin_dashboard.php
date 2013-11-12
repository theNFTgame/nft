<?php $this->layout->block('breadcrumbs')?>
<a class="current">首页</a>
<?php $this->layout->block()?>
	<section id="main" class="column">
		<h4 class="alert_info">欢迎！上次登录 <?php echo $admin_last_login?></h4>
		<div class="spacer"></div>
        <article class="module width_full">
            <header>
                <h3>24小时</h3>
            </header>
            <div class="module_content">
                <h2>互动游戏</h2>
                <h1><?php echo $i_game_play_count?></h1>
                <h2>单机游戏</h2>
                <h1><?php echo $s_game_play_count?></h1>
                </div>
            </div>
        </article>
	</section>

