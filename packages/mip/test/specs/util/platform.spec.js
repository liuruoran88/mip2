/**
 * @file util platform spec file
 * @author sekiyika(pengxing@baidu.com)
 */

/* eslint-disable no-unused-expressions */
/* global describe, it, expect, sinon */

import util from 'src/util'

const platform = util.platform

function changeUa (ua) {
  let stub = sinon.stub(platform, '_ua')
  stub.callsFake(() => ua)
  platform.start()
  stub.restore()
}

describe('platform', function () {
  describe('osVersion', function () {
    it('android version', function () {
      let stub1 = sinon.stub(platform, '_ua')
      stub1.returns('Mozilla/5.0 (Linux; Android 5.0.2; vivo X5M Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/38.0.0.0 Mobile Safari/537.36')
      let stub2 = sinon.stub(platform, 'isAndroid')
      stub2.returns(true)
      let stub3 = sinon.stub(platform, 'isIos')
      stub3.returns(false)

      let osVersion = platform.getOsVersion()
      stub1.restore()
      stub2.restore()
      stub3.restore()
      expect(osVersion).to.be.equal('5.0.2')
    })

    it('iOS version', function () {
      let stub1 = sinon.stub(platform, '_ua')
      stub1.returns('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Mobile/14B100 MicroMessenger/6.5.5 NetType/WIFI Language/zh_CN')
      let stub2 = sinon.stub(platform, '_appVersion')
      stub2.returns('5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0 Mobile/14B100 Safari/602.1')
      let stub3 = sinon.stub(platform, 'isAndroid')
      stub3.returns(false)
      let stub4 = sinon.stub(platform, 'isIOS')
      stub4.returns(true)

      let osVersion = platform.getOsVersion()
      stub1.restore()
      stub2.restore()
      stub3.restore()
      stub4.restore()
      expect(osVersion).to.be.equal('10.1.1')
    })

    it('app version', function () {
      let appVersion = platform._appVersion()
      expect(appVersion).to.be.a('string')
    })
  })

  describe('version', function () {
    it('iOS version', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1')
      expect(platform.isIos()).to.be.true
    })

    it('android version', function () {
      changeUa('Lenovo-K920_TD/V2.5 Linux/3.4.5 Android/5.0 Release/03.14.2015 Browser/AppleWebKit537.36 Chrome/30.0.0.0 Mobile Safari/537.36;')
      expect(platform.isAndroid()).to.be.true
    })
  })

  describe('browser', function () {
    it('wechatApp', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Mobile/14B100 MicroMessenger/6.5.5 NetType/WIFI Language/zh_CN')
      expect(platform.isWechatApp()).to.be.true
    })

    it('baiduApp', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Mobile/14B100 baiduboxapp/0_01.5.2.8_enohpi_6311_046/1.1.01_2C2%256enohPi/1099a/421EA1C8CACE9A9A18FE446EADD4F8B96D1C66E3DFCAFFEGQOA/1')
      expect(platform.isBaiduApp()).to.be.true
    })

    it('weiboApp', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Mobile/14B100 Weibo (iPhone6,2__weibo__7.1.0__iphone__os10.1.1)')
      expect(platform.isWeiboApp()).to.be.true
    })

    it('QQApp', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Mobile/14B100 QQ/6.6.9.412 V1_IPH_SQ_6.6.9_1_APP_A Pixel/640 Core/UIWebView NetType/WIFI')
      expect(platform.isQQApp()).to.be.true
    })

    it('uc', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/14B100 UCBrowser/11.4.7.931 Mobile AliApp(TUnionSDK/0.1.12)')
      expect(platform.isUc()).to.be.true
    })

    it('baidu', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10. Mobile/14B100 Safari/600.1.4 baidubrowser/4.6.0.136 (Baidu; P2 10.1.1)')
      expect(platform.isBaidu()).to.be.true
    })

    it('QQ', function () {
      changeUa('Mozilla/5.0 (iPhone 5SGLOBAL; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0 MQQBrowser/7.2.1 Mobile/14B100 Safari/8536.25 MttCustomUA/2 QBWebViewType/1')
      expect(platform.isQQ()).to.be.true
    })

    it('android browser', function () {
      changeUa('Mozilla/5.0 (Linux; Android 5.0.2; vivo X5M Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/38.0.0.0 Mobile Safari/537.36')
      expect(platform.isAdr()).to.be.true
    })

    it('android samsung browser', function () {
      changeUa('Mozilla/5.0 (Linux; Android 6.0.1; samsung Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36')
      expect(platform.isAdr()).to.be.true
    })

    it('safari', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0 Mobile/14B100 Safari/602.1')
      expect(platform.isSafari()).to.be.true
    })

    it('chrome', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.79 Mobile/14B100 Safari/602.1')
      expect(platform.isChrome()).to.be.true
    })

    it('fireFox', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) FxiOS/6.1 Mobile/14B100 Safari/602.2.14')
      expect(platform.isFireFox()).to.be.true
    })
  })

  describe('browser', function () {
    it('trident', function () {
      changeUa('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)')
      expect(platform.isTrident()).to.be.true
    })

    it('gecko', function () {
      changeUa('Mozilla/5.0 (Android 5.0.2; Mobile; rv:42.0) Gecko/42.0 Firefox/42.0')
      expect(platform.isGecko()).to.be.true
    })

    it('webkit', function () {
      changeUa('Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.79 Mobile/14B100 Safari/602.1')
      expect(platform.isWebkit()).to.be.true
    })
  })

  describe('needSpecialScroll', function () {
    it('needSpecialScroll', function () {
      expect(platform.needSpecialScroll).to.be.true
    })
  })
})
