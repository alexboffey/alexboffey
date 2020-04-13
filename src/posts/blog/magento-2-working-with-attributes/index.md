---
title: "Working with attributes in Magento 2"
subtitle: "How attributes can be used to construct complex product views."
date: "2017-12-03T00:00:00.000Z"
post_type: "blog"
tags: "Magento,Magento 2,Attributes,layout XML,phtml template"
published: true
---

Attributes are used in Magento as individual pieces of meta data that apply to a product or set of products. They're especially useful for filtering and comparing products; allowing users to refine their selection of products against a specified set of conditions.

However, a recent Magento project I have been involved with required a lot of custom content to be added to the product view and we opted to use product attributes to let our client customise this content on an individual product basis.

## Using Magento's attribute template.

Magento ships with an attribute template in its core which we can use this to output any attribute from a layout file. This technique is ideal for outputting simple things like small banners or blocks of text which require little or no modification to their markup.

Magento's naming convention for attributes is that each word of the attribute name is capitalised and that each word of the attribute code is lower case connected with an underscore.

So an attribute called _Product Messages_ would have the attribute code of _product_messages_.

```xml
<block class="Magento\Catalog\Block\Product\View\Description" name="product.info.messages" template="product/view/attribute.phtml" before="-">
    <arguments>
        <argument name="at_call" xsi:type="string">getProductMessages</argument>
        <argument name="at_code" xsi:type="string">product_messages</argument>
        <argument name="css_class" xsi:type="string">product_messages</argument>
        <argument name="add_attribute" xsi:type="string">itemprop="product_messages"</argument>
    </arguments>
</block>
```

Note the at_call argument is calling a method named _getProductMessages_, this is another naming convention surrounding product attributes.

From the example above, for the attribute named _Product Messages_ a product object will have the method _getProductMessages()_ attached to it by Magento.

## Attributes in custom templates.

As touched on above, Magento will supply the product object with a get method for the attributes attached to that product. This can be utilised to build custom content blocks on a product view where the content can be managed by a store admin.

To continue with the above example we could output our _Product Messages_ attribute like so:

```php
<?php $_product = $block->getProduct(); ?>
<?php if ( $_product->getProductMessages() ) : ?>
    <div class="product-messages">
        <p>
            <?php echo $_product->getProductMessages(); ?>
            /**
            * We can also access the attribute content using the getData() method
            */
            <?php echo $_product->getData('product_messages'); ?>
        </p>
    </div>
<?php ?>
```

This is a simple example, but as product attributes have many different input types including _images_ and _WYSIWYG content_, we can use them build larger content blocks which we can combine to form part of more complex, customisable product views.

## Taking this a step further.

Using the pattern above, we can start constructing an extended product view through using multiple templates which each of which are going to use different attributes.

We would start by pulling in our templates as blocks into our layout file. In this example we are overriding the core _Magento_Catalog_ module.

### catalog_category_view.xml

In this file were simply pulling in some templates that we have created and stored inside of a _view_ subdirectory in our overridden _Magento_Catalog_ module.

```xml
<referenceContainer name="content">
    <container name="product.details" htmlTag="section" htmlClass="product-details" htmlId="product-details" after="product.info.main">
        <block class="Magento\Catalog\Block\Product\View" name="product.info.details.overview" template="Magento_Catalog::product/view/detail.phtml" />
        <block class="Magento\Catalog\Block\Product\View" name="product.details.features" template="Magento_Catalog::product/view/features.phtml" />
        <block class="Magento\Catalog\Block\Product\View" name="product.details.specification" template="Magento_Catalog::product/view/specification.phtml" />
    </container>
</referenceContainer>
```

### features.phtml

This is an example of a template file where its content is populated with data from product attributes. We're using attributes to display a title, a description, content and to set a background image on the element.

Note that this example is using a custom helper method to get the image url from an attribute.

```php
<?php $_product = $block->getProduct(); ?>
<?php if ($_product->getFeaturesTitle() && $_product->getFeaturesDescription()) : ?>
    <div class="features"
        style="background-image: url(<?php echo $this->helper('Askelite\Product\Helper\Data')->getMediaUrl($_product->getData('features_background_image')); ?>);">
        <header class="features__header">
            <h3><?php echo $_product->getFeaturesTitle(); ?></h3>
            <p><?php echo $_product->getFeaturesDescription(); ?></p>
        </header>
        <?php if ($_product->getFeaturesContent()) : ?>
            <section class="features__content">
                <?php echo $_product->getFeaturesContent(); ?>
            </section>
        <?php endif; ?>
    </div>
<?php endif; ?>
```

This example is demonstrating the use of just three of the different product attribute input types:

- Text fields for the title & description
- WYSIWYG text areas for the content
- Media images for the background image

As you can imagine, this technique can be applied in different ways to meet the requirements for product layout spanning across different projects.
