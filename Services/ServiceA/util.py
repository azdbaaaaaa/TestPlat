#! /usr/bin/env python
# -*- coding:utf-8 -*-

import logging
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

class logger(object):
    """docstring for logging"""
    def __init__(self, file='./test.log', level='DEBUG'):
        super(logger, self).__init__()
        self.file = file
        self.level = level
        fh = logging.FileHandler(self.file) # 创建一个handler，用于写入日志文件
        ch = logging.StreamHandler() # 再创建一个handler，用于输出到控制台
        formatter = logging.Formatter('[%(asctime)s][%(filename)s][%(levelname)s]:%(message)s') # 定义handler的输出格式formatter
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)
        self.logger = logging.getLogger()
        self.logger.setLevel(logging.DEBUG)
        self.logger.addHandler(fh)
        self.logger.addHandler(ch)

    def debug(self, msg):
        self.logger.debug(msg)

    def info(self, msg):
        self.logger.info(msg)

    def err(self, msg):
        self.logger.err(msg)

# 创建一个logger
# logger = logging.getLogger()
# logger.setLevel(logging.DEBUG)
# logger.addHandler(fh)
# logger.addHandler(ch)
