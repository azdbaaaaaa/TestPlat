#! /usr/bin/env python
# -*- coding:utf-8 -*-

import logging
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

# 创建一个handler，用于写入日志文件
fh = logging.FileHandler('./test.log')

# 再创建一个handler，用于输出到控制台
ch = logging.StreamHandler()

# 定义handler的输出格式formatter
formatter = logging.Formatter('[%(asctime)s][%(filename)s][%(levelname)s]:%(message)s')
fh.setFormatter(formatter)
ch.setFormatter(formatter)

# 创建一个logger
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
logger.addHandler(fh)
logger.addHandler(ch)
