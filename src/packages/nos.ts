import {NosClient} from '@xgheaven/nos-node-sdk'

export class NosService {
    /**
     * nos-node-sdk实例
     */
    private nosclient: NosClient;

    constructor(private accessKey: string, private  accessSecret: string) {
      this.nosclient = new NosClient({
        accessKey: this.accessKey,
        accessSecret: this.accessSecret,
        endpoint: 'http://nos-jd.163yun.com',
        defaultBucket: '163h5',
      })
    }

    /**
     * 上传文件
     * @param src 源文件路径，绝对路径
     * @param objectKey 上传后的路径以及文件名，即域名后的部分
     */
    public upload(src: string, objectKey: string) {
      this.nosclient.putObject({
        file: src,
        objectKey: objectKey,
      })
    }
}

