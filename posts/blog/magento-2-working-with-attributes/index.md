---
title: 'Working with attributes in Magento 2'
subtitle: 'How attributes can be used to construct complex product views.'
date: '2017-12-03T00:00:00.000Z'
post_type: 'blog'
published: 'true'
---

Attributes are used in Magento as self contained pieces of meta data that apply to a product or set of products. They're especially useful for filtering and comparing products; allowing users to refine their selection of products against a specified set of conditions.

However, a recent Magento project I have been involved with required a lot of custom content to be added to the product view and we opted to use product attributes to let our client customise this content on an individual product basis.

## Using Magento's attribute template.

Magneto ships with an attribute template in it's core which we can use this to output any attribute from a layout file. This technique is ideal for outputting simple things like small banners or blocks of text which require little or no modification to their markup.

Magento's naming convension for attributes is that each word of the attribute name is capitalised and that each word of the attribute code is lower case connected with an underscore.

So an attribute called *Product Messages* would have the attribute code of *product_messages*.

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

Note the at_call argument is calling a method named *getProductMessages*, this is another naming convention surrounding product attributes.

From the example above, for the attribute named *Product Messages* a product object will have the method *getProductMessages()* attatched to it by Magento.

## Attributes in custom templates.

As touched on above, Magneto will supply the product object with a get method for the attributes attatched to that product. This can be utilised to build custom content blocks on a product view where the content can be managed by a store admin.

To continue from the above example we could output our *Product Messages* attribute like so:

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

This is a simple example, but as product attributes have many different input types including *images* and *WYSIWYG content*, we can use them build larger content blocks which we can combine to form part of more complex, cusomisable product views.
