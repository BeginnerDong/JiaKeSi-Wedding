# JiaKeSi-Wedding
Wechat miniprogram,Wedding Activity

# 婚介项目开发文档

### 目录

- 项目说明
- 功能概述
- 数据对照表


---
**1\. 项目说明**

&emsp;&emsp;1. 通用字段例如id,user_no,create_time等，未做说明
&emsp;&emsp;2. 考虑到数据表数量、字段数量的平衡设计，部分表和字段存在重复使用的情况，故英文key和中文注释无关联，请遵照对照注释


**2\. 功能概述**

&emsp;&emsp;1.婚礼信息展示;
&emsp;&emsp;2.婚礼美图展示;
&emsp;&emsp;3.婚礼管理(包括电子请帖、现场活动墙两个主要模块)

---
**3\. 数据对照表**

通用字段说明

| 字段 | 类型 | 说明 |
| ------    | ------  | ------ | 
| id | int(11)| 主键：该数据ID|
| listorder | int(11) |自定义排序 |
| create_time | int(11) |创建时间 |
| update_time | int(11) |更新时间 |
| delete_time | bigint(13) |删除时间 |
| thirdapp_id | int(11) |关联thirdapp |
| user_no | varchar(255) |关联创建人user_no |
| user_type | tinyint(2) | 用户类型:1.平台管理员;2.员工;3.用户 |
| status | tinyint(2) |状态:1正常；-1删除 |



user表

| 字段 | 类型 | 说明 |
| ------    | ------  | ------ | 
| nickname | varchar(255) | 微信昵称 |
| openid | varchar(255)| 微信openid |
| headImgUrl | varchar(9999) |  微信头像 |
| primary_scope| int(255) | 权限级别：90平台管理员;60超级管理员;30管理员;10用户 |
| user_no| varchar(255)|用户编号 |



label表

| 字段 | 类型 | 说明 |
| ------    | ------  | ------  | 
| title | varchar(40) | 菜单名称 |
| description| varchar(255) | 描述 |
| parentid| int(11) | 父级菜单ID |
| type | tinyint(2) |  1,menu;2,menu_item; |



label表（城市分店）type：12

| 字段 | 类型 | 说明 |
| ------    | ------  | ------  | 
| title | varchar(40) | 分店名称 |
| keywords | varchar(255) | 分店地点 |
| contactPhone | varchar(255) | 分店电话 |
| mainImg | varchar(9999) | 分店主图 |



article表（图文信息）type:1

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 文章标题 |
| small_title | varchar(100) | 文章副标题 |
| menu_id | int(11) | 文章类别 |
| content | text | 文章内容 |
| mainImg | varchar(9999) | 文章主图 |



article表（宴会信息）type:2

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 宴会标题 |
| small_title | varchar(100) | 宴会副标题 |
| address | varchar(255) | 宴会地点 |
| passage1 | text | 宴会时间 |
| contactPhone | varchar(255) | 客户电话 |
| mainImg | varchar(9999) | 宴会主图 |
| keywords | varchar(255) | 宴会风格 |
| content | text | 宴会宣言 |
| menu_id | int(11) | 城市分店 |



article表（问卷题目）type:3

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 题目标题 |
| listorder | int(11) | 题目编号 |
| passage1 | text | 选项一 |
| passage2 | text | 选项二 |
| passage3 | text | 选项三 |
| passage4 | text | 选项四 |



article表（模板请帖信息）type:4

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 请帖标题 |
| small_title | varchar(100) | 请帖副标题 |
| address | varchar(255) | 请帖地点 |
| passage1 | text | 请帖时间 |
| mainImg | varchar(9999) | 请帖图片 |
| passage_array | text | 请帖文字 |



article表（用户请帖信息）type:6

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 请帖标题 |
| small_title | varchar(100) | 请帖副标题 |
| address | varchar(255) | 请帖地点 |
| passage1 | text | 请帖时间 |
| mainImg | varchar(9999) | 请帖图片 |
| content | text | 请帖文字 |
| passage2 | varchar(255) | 关联模板id |



message表（问卷提交）type:4

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 答卷标题 |



message表（问卷提交选项）type:5

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 题目标题 |
| relation_id | int(11) | 答卷id |
| passage1 | text | 题目id |
| keywords | varchar(255) | 答案 |



message表（用户收到请帖）type:6

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| relation_id | int(11) | 请帖id |



message表（活动咨询）type:7

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 姓名 |
| phone | varchar(255) | 电话 |
| contet | text | 备注 |



message表（提现申请）type:8

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| cash | decimal(10,2) | 提现金额 |
| class | tinyint(2) | 提现状态（1：申请提现，2，提现通过，3，提现拒绝） |



bless表（用户收到请帖祝福）

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| to_user_no | varchar(255) | 接受祝福用户的user_no |
| user_no | varchar(255) | 发送祝福用户的user_no |
| invite_id | int(11) | 请柬ID |
| contet | text | 祝福语 |



feast表（投屏活动）

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(255) | 投屏标题 |
| title_two | varchar(255) | 投屏标题二 |
| title_three | varchar(255) | 投屏标题三 |
| title_four | varchar(255) | 投屏标题四 |
| feast_no | varchar(255) | 投屏活动编码 |



feast-user表（投屏活动参与用户）

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| nick_name | varchar(255) | 微信昵称 |
| headImgUrl | varchar(500) | 微信头像 |
| phone | varchar(255) | 电话 |
| gender | varchar(50) | 性别 |
| married | varchar(50) | 是否结婚 |
| isSign | varchar(50) | 是否签到 |




game-chat表（投屏活动用户祝福）

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| relation_user_no | varchar(255) | 用户no |
| contet | text | 祝福内容 |



game表（活动游戏）type：1

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(255) | 游戏标题 |
| content | text | 游戏内容 |
| mainImg | varchar(999) | 游戏主图 |
| description | varchar(255) | 游戏描述 |
| remark | varchar(500) | 游戏备注 |

/*新增加*/
game表（游戏奖项）type：2

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(255) | 奖项标题 |
| content | text | 获奖内容 |
| mainImg | varchar(999) | 主图 |
| description | varchar(255) | 描述 |
| remark | varchar(500) | 备注 |
| parentid | int(11) | 父级id |
| count | int(11) | 中奖人数 |

game-file表（活动配合图片）type：1

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| relation_id | int(11) | 活动id |



game-file表（活动相册）type：2

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| relation_id | int(11) | 活动id |



game-log表（活动游戏日志）type：1

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| relation_id | int(11) | 游戏no|
| count | int(11) | 计数 |
| user_no | varchar(255) | 参与用户的user_no |
| final | int(11) | 结果（奖品id） |


