0.3.4 (2018-07-19)
  * Bug fix: throw error if `addLegend` is called before control is added to the map

0.3.3 (2018-07-13)
  * Add support for disabling visibility controls (see `options`)

0.3.2 (2018-05-30)
  * Add `removeLegend` method

0.3.1 (2018-05-29)
  * Add `updateOpacity` to `options`
    - A new method that allows to use a custom function for adjusting layers opacity
  * Fix version

0.3.0 (2017-11-13)
  * Add `addLegend`
    - A new method to add legends to existing instances of HtmlLegend

0.2.2 (2017-08-07)
  * Fix the wrong call to the map container in `_connectLayer`.

0.2.1 (2017-07-26)
  * Add `collapsedOnInit` to `options`
    - A new option that allows users to initialize an instance in expanded or collapsed mode.
