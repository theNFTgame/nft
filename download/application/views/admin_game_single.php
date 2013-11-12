<?php $this->layout->block('header')?>
单机游戏
<?php $this->layout->block()?>
<?php $this->layout->block('breadcrumbs')?>
<a class="current">单机游戏</a>
<?php $this->layout->block()?>
<?php $this->layout->block('game_history_single')?>
单机游戏
<?php $this->layout->block()?>
<section id="main" class="column">
    <?php if(!$game_list || count($game_list) <=0): ?>
        <h3 style="text-align: center">没有单机游戏记录</h3>
    <?php else:?>
	<article class="module width_full">
		<header>
			<h3 class="tabs_involved">
                单机游戏 (总数: <?php echo $total_count?>条)&nbsp;<a href="<?php echo base_url()?>admin/game/export">导出</a>
			</h3>
			<h3>
				<?php echo $this->pagination->create_links();?>
			</h3>
		</header>
		<table class="tablesorter" cellspacing="0"> 
			<thead> 
				<tr> 
   					<th>时间</th>
    				<th>ID</th> 
    				<th>分数</th>
    				<th>用户ID</th>
    				<th>用户名</th>
    				<th>奖券</th>
                    <th>玩家ip</th>
    				<th>操作</th>
				</tr> 
			</thead> 
			<tbody> 
				<?php foreach($game_list as $game):?>
				<tr>
                    <td><?php echo $game->play_at?></td>
    				<td><?php echo $game->id?></td>
    				<td><?php echo $game->game_score?></td>
    				<td><?php echo $game->user_id?></td>
    				<td><?php echo $game->user_name?></td>
    				<td><?php echo $game->coupon_id?$game->coupon_id:'-'?></td>
                    <td><?php echo $game->client_ip?></td>
    				<td>
    					<!-- <input type="image" src="<?php echo base_url()?>images/icn_trash.png" title="Trash" onclick="window.location='<?php echo base_url()?>admin/brand/delete?brand_id=<?php echo $game->id?>'"> -->
    				</td>
				</tr>
				<?php endforeach;?> 
			</tbody>
		</table>
	</article>
    <?php endif?>
</section>
		

