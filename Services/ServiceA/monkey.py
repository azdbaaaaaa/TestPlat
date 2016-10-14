#! /usr/bin/env python
# -*- coding:utf-8 -*-

import subprocess
import getopt
import sys
import util
reload(sys)
sys.setdefaultencoding('utf-8')


def Usage():
    print 'PyTest.py usage:'
    print '-h,--help: print help message.'
    print '-v, --version: print script version'
    print '-o, --output: input an output verb'
    print '--foo: Test option '
    print '--fre: another test option'


def Version():
    print 'PyTest.py 0.0.1'


def doMonkey(device, config, outputfile):
    if device is None or config is None or outputfile is None:
        Usage()
        sys.exit(3)
    cmd = "adb -s " + device + " shell monkey"
    with open(config) as f:
        for argv in f.readlines():
            for x in xrange(0, len(argv.strip().split(','))):
                tmp = argv.strip().split(',')[x]
                if tmp is not "":
                    cmd += " " + tmp
    child = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    # child.wait()
    print child.returncode
    (stdoutdata, stderrdata) = child.communicate()
    print("stderrdata:%s") % stderrdata
    # print("stdoutdata:%s") % stdoutdata
    with open(outputfile, "a") as f:
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
            print 'unhandled option'
            sys.exit(3)
    doMonkey(device, config, outputfile)


if __name__ == '__main__':
    main(sys.argv)
    util.logger.debug("i am debug")
    util.logger.info("i am info")
