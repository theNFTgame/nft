<?php $this->layout->block('header')?>
Home
<?php $this->layout->block()?>
<?php
$link = '设置';
$title = '上传优惠券';
$breadcrumbs = '<a href="' . base_url(). 'admin/reward">奖项设置</a><div class="breadcrumb_divider"></div><a class="current">' . $title. '</a>';
$linkBlock = 'reward';
$reward_id = $reward->id;
?>
<?php $this->layout->block('breadcrumbs')?>
<?php echo $breadcrumbs?>
<?php $this->layout->block()?>
<?php $this->layout->block($linkBlock)?>
<?php echo $link?>
<?php $this->layout->block()?>
<section id="main" class="column">
    <article class="module width_full">
        <form action="<?php echo base_url()?>admin/reward/import?reward_id=<?php echo $reward_id?>" method="post" enctype="multipart/form-data">
            <header><h3><?php echo $title?></h3></header>
            <div class="module_content">
                <fieldset>
                    <label for="attachment">CSV文件:</label>
                    <input type="file" name="attachment" />
                    <input type="checkbox" name="force_update" value="1" /> 强制更新
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

