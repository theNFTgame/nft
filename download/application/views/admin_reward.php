<?php $this->layout->block('header')?>
Work
<?php $this->layout->block()?>
<?php $this->layout->block('breadcrumbs')?>
<a class="current">查看</a>
<?php $this->layout->block()?>
<?php $this->layout->block('reward')?>
查看
<?php $this->layout->block()?>

<section id="main" class="column">
    <?php if(!$reward_list || count($reward_list) <=0): ?>
        <h3 style="text-align: center">没有已经设置的奖项，你可以<a href="<?php echo base_url()?>admin/reward/create">新增奖项</a></h3>
    <?php else:?>
	<article class="module width_full">
		<header>
            <h3 class="tabs_involved">
               <a href="<?php echo base_url()?>admin/reward/create">新增奖项</a>
            </h3>
		</header>
		<table class="tablesorter" cellspacing="0"> 
			<thead> 
				<tr>
    				<th>ID</th> 
    				<th>名称</th>
    				<th>概率</th>
                    <th>优惠券数量</th>
    				<th>操作</th>
				</tr> 
			</thead> 
			<tbody> 
				<?php foreach($reward_list as $reward):?>
				<tr>
    				<td><?php echo $reward->id?></td>
    				<td><?php echo $reward->reward_name?></td>
    				<td><?php echo $reward->reward_probability?></td>
                    <td><?php echo $reward->coupon_count ?></td>
    				<td>
                        <input type="image" src="<?php echo base_url()?>images/icn_edit.png" title="Edit" onclick="window.location='<?php echo base_url()?>admin/reward/create?reward_id=<?php echo $reward->id?>'">
                        <input type="image" src="<?php echo base_url()?>images/icn_jump_back.png" title="Import" onclick="window.location='<?php echo base_url()?>admin/reward/upload?reward_id=<?php echo $reward->id?>'">
    					<input type="image" src="<?php echo base_url()?>images/icn_trash.png" title="Trash" onclick="window.location='<?php echo base_url()?>admin/reward/delete?reward_id=<?php echo $reward->id?>'">
    				</td>
				</tr>
				<?php endforeach;?> 
			</tbody>
		</table>
	</article>
    <?php endif?>
</section>
		

