class solution(object):
    def sum(self,arr,target):
        result = []
        def helpFun(lastTarget,tempArr,idx):
            if(idx>size(arr)):
                return
            if(lastTarget == 0):
                result.push()