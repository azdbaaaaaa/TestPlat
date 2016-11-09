#! /usr/bin/env python
# -*- coding:utf-8 -*-

import subprocess
import getopt
import sys
import os
import util
reload(sys)
sys.setdefaultencoding('utf-8')
log = util.logger()

def Usage():
    print 'monkey.py usage:'
    print '-h, --help: print help message.'
    print '-v, --version: print script version'
    print '-c, --config: config file for monkey'
    print '-d, --device: target android device '
    print '-o, --outputfile: monkey log file'


def Version():
    print 'PyTest.py 0.0.1'


def doMonkey(device, config, outputfile):
    if config is None or outputfile is None:
        Usage()
        sys.exit(3)
    if device is None:
        cmd = "adb shell monkey"
    else:
        cmd = "adb -s " + device + " shell monkey"
    with open(config) as f:
        for argv in f.readlines():
            for x in xrange(0, len(argv.strip().split(','))):
                tmp = argv.strip().split(',')[x]
                if tmp is not "":
                    cmd += " " + tmp
    child = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    # child.wait()
    # print child.returncode
    (stdoutdata, stderrdata) = child.communicate()
    print("returncode:%s") % child.returncode
    if stdoutdata:
        log.debug(stdoutdata)
    if stderrdata:
        log.err(stderrdata)
    if not os.path.exists(os.path.dirname(outputfile)):
        os.makedirs(os.path.dirname(outputfile))
    with open(outputfile, "a") as f:
        f.write(cmd)
        f.write(stdoutdata)


def main(argv):
    try:
        opts, args = getopt.getopt(argv[1:], "hvc:d:o:", ["help", "version", "config=", "device=", "outputfile="])
    except getopt.GetoptError:
        Usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            Usage()
            sys.exit(0)
        elif opt in ("-v", "--version"):
            Version()
            sys.exit(0)
        elif opt in ("-c", "--config"):
            config = arg
        elif opt in ("-d", "--device"):
            device = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg
        else:
            Usage()
            sys.exit(3)
    doMonkey(device, config, outputfile)


if __name__ == '__main__':
    main(sys.argv)
    # log.debug("i am debug")
    # log.info("i am info")
    # monkey.py -d 75UBBLH2278H -c config.plist -o 1.log
