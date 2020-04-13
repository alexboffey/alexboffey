---
title: 'Static blocks in Magento 2'
subtitle: '3 different ways to output static blocks.'
date: '2017-11-28T00:00:00.000Z'
post_type: 'blog'
tags: 'Magento,Magento 2,Static Block,CMS Block,layout XML,phtml template'
published: true
---

CMS static blocks are blocks of content that can be that can be created and edited inside the Magento admin area. They're perfect for use as banners, promotions, return policies or any other type of content which may change regularly.

Demonstrated below are three different methods for outputting them in Magento 2 projects.

## In a layout file.

```xml
<block class="Magento\Cms\Block\Block" name="block.name" as="blockName">
    <arguments>
        <argument name="block_id" xsi:type="string">block_id</argument>
    </arguments>
</block>
```

## In a template.

```php
<?php echo $block->getLayout()
            ->createBlock('Magento\Cms\Block\Block')
            ->setBlockId('block_id')
            ->toHtml(); ?>
```

## In the CMS editor.

```
{{block class="Magento\\Cms\\Block\\Block" block_id="block_id"}}
```
