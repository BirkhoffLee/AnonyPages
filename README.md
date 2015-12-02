臉書上靠北專頁的匿名投稿系統  

# 這些專頁使用我們的系統  
[靠北AVA](https://www.facebook.com/KaoBeiAVA/)  
[靠北LOL](https://www.facebook.com/KaoBeiLOL/)  
[靠北餐廳](https://www.facebook.com/%E9%9D%A0%E5%8C%97%E9%A4%90%E5%BB%B3-338773669580269)

# 安裝
請進入 config.sample.php 依照註解設定  
設定完成後請將其檔案名改為 config.php  
上傳到你的 Server，然後首先請訪問 http(s)://domain/renewtoken.php  
靠北的網址是：http(s)://domain/page_id  

# 自動更新 Page Access Token  
如果要自動更新 Page Access Token，請訪問 http(s)://domain/renewtoken.php  

# 遇到問題  
如果在更新 Page Access Token 的時候遇到問題，可以嘗試打開瀏覽器的 Console 看一下有無錯誤訊息  
如錯誤持續，可以發一個 Issue  

# 後續更新
我很討厭 PHP，我打算在 2016/1 月 ~ 3 月間將本系統用 node.js 重寫，將會有更高的執行效率，敬請期待。目前的版本只會持續修復 bug。另外，歡迎 fork 及 送PR 來讓此靠北系統變得更好。  
屆時，我會將目前的 php version 作保留並公開下載，也歡迎其他開發者送 PR。
