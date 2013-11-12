<?php $this->layout->block('header')?>
Home
<?php $this->layout->block()?>
<?php
$link = '新增';
$title = '新增奖项';
$breadcrumbs = '<a class="current">新增奖项</a>';
$linkBlock = 'reward_new';

/*poster data */
$reward_id = '';
$reward_name = '';
$reward_probability = '';

if(isset($reward)){
   	$title = '编辑 '. $reward->reward_name . '(ID:'. $reward->id . ')';
   	$breadcrumbs = '<a href="' . base_url(). 'admin/reward">Edit Reward</a><div class="breadcrumb_divider"></div><a class="current">' . $title. '</a>';

    $reward_id = $reward->id;
    $reward_name = $reward->reward_name;
    $reward_probability = $reward->reward_probability;
} 
?>
<?php $this->layout->block('breadcrumbs')?>
<?php echo $breadcrumbs?>
<?php $this->layout->block()?>
<?php $this->layout->block($linkBlock)?>
<?php echo $link?>
<?php $this->layout->block()?>
	<section id="main" class="column">
		<article class="module width_full">
			<form action="<?php echo base_url()?>admin/reward/save" method="post" enctype="multipart/form-data">
			<header><h3><?php echo $title?></h3></header>
				<div class="module_content">
					<fieldset>
						<label>名称</label>
						<input type="text" name="reward_name" id="checkempty" class=":required" value="<?php echo $reward_name?>">
					</fieldset>
                    <fieldset>
                         <label>概率</label>
                         <input type="text" name="reward_probability" value="<?php echo $reward_probability?>">
                         <input type="hidden" name="reward_id" value="<?php echo $reward_id?>" />
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

