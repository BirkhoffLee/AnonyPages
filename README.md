# AnonyPages -- Posting articles anonymously to Facebook pages.  

> ATTENTION: This branch is still in development.  

## These pages are using AnonyPages  
[靠北AVA](https://www.facebook.com/KaoBeiAVA/)  
[靠北LOL](https://www.facebook.com/KaoBeiLOL/)  
[靠北餐廳](https://www.facebook.com/%E9%9D%A0%E5%8C%97%E9%A4%90%E5%BB%B3-338773669580269)  

## Installation  
Open config.sample.js and follow the comments to setup.  
After setting up, please rename it to config.js.  
Now, run  
```  
cd /path/to/AnonyPages  
npm install  
npm install -g forever  
forever start index.js  
```  
and it'll be running! The posting url is http(s)://hostname/page/page_id.  

## Realtime new posts notifications  
Open http(s)://hostname/notification, connect to facebook, give the page browser notification permission, pin the tab (optional), and you can know if a new article was posted to any of the configured facebook pages.  

## Troubleshooting  
Problem: After pressing the post button, the screen stucks.  
Problem: The screen stucks in "Connecting to Facebook.." on realtime new posts notifications page.  
Solution: Open your browser console by pressing F12, check if there's any error message. If not, you can check the server log by running the commands below:  
`
forever logs
`  
Copy the logfile value of AnonyPages. For example: `/root/.forever/Ia9F.log`, then:  
`
cat PATH_TO_LOGFILE
`  
Try to fix the problem by yourself with the log. If you still cannot fix it, create a new issue with the logs.  

### --Chinese Readme below--  
# AnonyPages -- 臉書的匿名靠北粉絲專頁管理系統  

> 注意：這個 branch 還處於開發狀態。  

## 這些粉絲專頁使用 AnonyPages  
[靠北AVA](https://www.facebook.com/KaoBeiAVA/)  
[靠北LOL](https://www.facebook.com/KaoBeiLOL/)  
[靠北餐廳](https://www.facebook.com/%E9%9D%A0%E5%8C%97%E9%A4%90%E5%BB%B3-338773669580269)  

## 設定  
打開 config.sample.js，依照檔案內的註解進行設定。  
待設定完畢後，請將其重新命名為 config.js。  
現在，在終端機內執行：  
```  
cd /path/to/AnonyPages  
npm install  
npm install -g forever  
forever start index.js  
```  
然後 AnonyPages 就會上線了！靠北的網址是：http(s)://主機名稱/page/粉絲專頁編號。  

## 即時新貼文通知  
打開 http(s)://主機名稱/notification，連線至臉書，給予頁面給您發送瀏覽器通知的權限，固定分頁（可選），然後頁面就會開始監視最新的貼文。  

## 遇到問題  
問題：按下發文按鈕，畫面沒有反應。  
問題：進入即時新貼文通知畫面，畫面卡在 “正在連線至臉書...”。  
解決方案：請嘗試將您瀏覽器的 Console 打開（F12），查看有無錯誤訊息。如果沒有，可在伺服器執行下列指令查看日誌：  
`
forever logs
`  
找到 AnonyPages 所對應的序號，複製該條 logfile 的值（如：`/root/.forever/Ia9F.log`）  
然後執行：  
`
cat 複製的值
`  
請嘗試依據上述錯誤訊息解決問題。如果您無法解決該問題，可以建立一個 Issue，記得附上日誌。  
