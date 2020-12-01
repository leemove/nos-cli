import {Command, flags} from '@oclif/command'

class NosCli extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    nosKey: flags.string({description: 'NOS AccessKey,可以通过环境变量"NOS_ACCESS_KEY"指定', default: process.env.NOS_ACCESS_KEY}),
    nosSecret: flags.string({description: 'NOS AccessSecret,可以通过环境变量"NOS_ACCESS_SECRET"指定', default: process.env.NOS_ACCESS_SECRET}),
  }

  static args = [{name: 'fileOrDirPath'}]

  static examples = [
    'nos abc.text',
  ]

  /**
   * 验证传入参数
   */
  private validOption() {
    const {args, flags} = this.parse(NosCli)
    if (!flags.nosKey) {
      throw new Error('请输入或者配置合理的AccessKey 见"--help"帮助')
    }
    if (!flags.nosSecret) {
      throw new Error('请输入或者配置合理的AccessSecret 见"--help"帮助')
    }
    if (!args.file) {
      throw new Error('没有检测到上传源文件地址，详见example')
    }
  }

  async run() {
    this.validOption()
    const {args, flags} = this.parse(NosCli)
    const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/index.ts`)
    if (args.fileOrDirPath && flags.force) {
      this.log(`you input --force and --file: ${args.fileOrDirPath}`)
    }
  }
}

export = NosCli
