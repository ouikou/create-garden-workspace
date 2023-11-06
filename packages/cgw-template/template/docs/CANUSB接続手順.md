# CANUSB接続手順
- PCとUSBCANをUSBケーブルで接続する。
- 以下のコマンドでPCがCANUSBを認識しているか確認する。
```
ls -l /dev/ttyUSB*
```
```
crw-rw---- 1 root dialout 188, 0  5月 22 14:03 /dev/ttyUSB0
```
`/dev/ttyUSB0`が出力されればOK。
- 以下のコマンドでsudoなしでCANにアクセスできるようにする。
```
sudo usermod -a -G dialout $USER
sudo chmod a+rw /dev/ttyUSB0
```
- 動作テストのためシリアル通信アプリをインストールする。
```
sudo apt-get install gtkterm
```
- PCを再起動。
- 以下のコマンドでgtktermを起動する。
```
gtkterm
```
- ポートの設定

Configuration→Port
```
Port: /dev/ttyUSB0
Baud Rate: 115200
Parity: none
Bits: 8
Stopbits: 1
Flow control: none
```
- 表示の設定

View→Hexadecimal

- CANの送受信テスト
1. CANUSBとターゲットのデバイスをCANケーブルで接続する
2. CANUSBの送受信バッファをクリアする

gtktermのウィンドウが選択された状態でEnterキーを3回押して
```
0D 0D 0D
```
を送信する。

CANUSBからの応答としてgtktermの画面に
```
0D 0D 0D
```
と表示されればOK。

送信したデータも表示させたい場合は

Configuration→Local echo

3. ボーレートの設定
```
S6
```
と入力しEnter。
```
0D
```
が返ってきたらOK。

その他のボーレートとコマンドの一覧

|コマンド|ボーレート|
|-------|--------|
|S0     |10K     |
|S1     |20K     |
|S2     |50K     |
|S3     |100K    |
|S4     |125K    |
|S5     |250K    |
|S6     |500K    |
|S7     |800K    |
|S8     |1M      |

4. ポートをOpen
```
O
```
と入力しEnter
```
0D
```
が返ってきたらOK。

5. データ送信

以下はCANにバイナリで0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07という8byteのデータを送信するコマンド。
```
t00180001020304050607
```
と入力しEnter。
```
7A 0D
```
が返ってきたらOK。

正常時は0x7a(小文字のz)、異常時は0x07が返ってくる。

プログラムを組む場合はバイナリデータをASCIIコードに変換してから送信する。
受信時もASCIIコードからバイナリに変換する必要がある。
