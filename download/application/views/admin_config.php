<?php $this->layout->block('header')?>
Work
<?php $this->layout->block()?>
<?php $this->layout->block('breadcrumbs')?>
<a class="current">设置</a>
<?php $this->layout->block()?>
<?php $this->layout->block('settings')?>
设 置
<?php $this->layout->block()?>

<section id="main" class="column">
    <article class="module width_full">
        <header>
            <h3>系统设置</h3>
        </header>
        <form action="<?php echo base_url()?>admin/config/save" method="post">
        <table class="tablesorter" cellspacing="0">
            <thead>
            <tr>
                <th>项目</th>
                <th>值</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>URL</td>
                    <td><input name="base_url" value="<?php echo $base_url?>" /></td>
                </tr>
                <tr>
                    <td>Session过期时间</td>
                    <td><input name="sess_expiration" value="<?php echo $sess_expiration?>" /></td>
                </tr>
                <tr>
                    <td>测试环境</td>
                    <td>
                        <select name="debug_environment">
                            <option value="1" <?php if($debug_environment) echo 'selected="selected"'?>>YES</option>
                            <option value="0" <?php if(!$debug_environment) echo 'selected="selected"'?>>NO</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>测试API URL</td>
                    <td><input name="debug_quyeba_client" value="<?php echo $debug_quyeba_api_url?>" /></td>
                </tr>
                <tr>
                    <td>正式API URL</td>
                    <td><input name="debug_quyeba_client" value="<?php echo $quyeba_api_url?>" /></td>
                </tr>
                <tr>
                    <td>测试Client</td>
                    <td><input name="debug_quyeba_client" value="<?php echo $debug_quyeba_client?>" /></td>
                </tr>
                <tr>
                    <td>测试Client key</td>
                    <td><input name="debug_quyeba_client_key" value="<?php echo $debug_quyeba_client_key?>" /></td>
                </tr>
                <tr>
                    <td>正式Client</td>
                    <td><input name="quyeba_client" value="<?php echo $quyeba_client?>" /></td>
                </tr>
                <tr>
                    <td>正式Client key</td>
                    <td><input name="quyeba_client_key" value="<?php echo $quyeba_client_key?>" /></td>
                </tr>
            </tbody>
        </table>
            <footer>
                <div class="submit_link">
                    <input type="submit" value="Save" class="alt_btn">
                </div>
            </footer>
        </form>
    </article>
    <article class="module width_full">
        <header>
            <h3>游戏设置</h3>
        </header>
        <form action="<?php echo base_url()?>admin/config/save" method="post">
        <table class="tablesorter" cellspacing="0">
            <thead>
            <tr>
                <th>项目</th>
                <th>值</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>每日每用户优惠券上限</td>
                <td><input name="coupon_per_user" value="<?php echo $coupon_per_user?>" /></td>
            </tr>
            </tbody>
        </table>
            <footer>
                <div class="submit_link">
                    <input type="submit" value="Save" class="alt_btn">
                </div>
            </footer>
        </form>
    </article>
</section>
		

