<?php $this->layout->block('header')?>
查看
<?php $this->layout->block()?>
<?php $this->layout->block('breadcrumbs')?>
<a class="current">查看</a>
<?php $this->layout->block()?>
<?php $this->layout->block('coupon')?>
查看
<?php $this->layout->block()?>

<section id="main" class="column">
    <?php if(!$coupon_list || count($coupon_list) <=0): ?>
        <h3 style="text-align: center">没有优惠券</h3>
    <?php else:?>
        <article class="module width_full">
            <header>
                <h3 class="tabs_involved">
                    优惠券 (总数: <?php echo $total_count?>条)&nbsp;&nbsp;<a href="javascript:void(0);" onclick="truncate();">清空</a>
                </h3>
                <h3>
                    <?php echo $this->pagination->create_links();?>
                </h3>
            </header>
            <table class="tablesorter" cellspacing="0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>代码</th>
                    <th>折扣</th>
                    <th>说明</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach($coupon_list as $coupon):?>
                    <tr>
                        <td><?php echo $coupon->id?></td>
                        <td><?php echo $coupon->coupon_code?></td>
                        <td><?php echo $coupon->coupon_discount?></td>
                        <td><?php echo $coupon->coupon_description?></td>
                        <td><?php echo $coupon->status?'已发放':'未发放' ?></td>
                        <td>
                            <input type="image" src="<?php echo base_url()?>images/icn_trash.png" title="Trash" onclick="window.location='<?php echo base_url()?>admin/coupon/delete?coupon_id=<?php echo $coupon->id?>'">
                        </td>
                    </tr>
                <?php endforeach;?>
                </tbody>
            </table>
        </article>
    <?php endif?>
</section>
<script type="text/javascript">
    var url="<?php echo base_url();?>";
    function truncate(){
        var r=confirm("删除全部优惠券?")
        if (r==true)
            window.location = url+"admin/coupon/truncate/";
        else
            return false;
    }

</script>

