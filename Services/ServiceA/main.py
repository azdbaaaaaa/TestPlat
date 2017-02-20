#! /usr/bin/env python
# -*- coding:utf-8 -*-

import subprocess
import getopt
import sys
import os
import util
reload(sys)
sys.setdefaultencoding('utf-8')

cmd = "python ./monkey.py -"
child = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
# child.wait()
# print child.returncode
(stdoutdata, stderrdata) = child.communicate()
