# 001
def learn001 ():
  ran = range(1,5)
  resultList = []
  for i in ran:
    for j in ran:
      for k in ran:
        if(i != j) and (j != k):
          resultList.append([i,j,k])
  print(resultList)
# learn001()


# 002

def learn002 ():
  profit = int(input('输入利润:'))
  result = 0
  money = [1000000,600000,400000,200000,100000,0]
  rate = [0.01,0.015,0.03,0.05,0.075,0.1]
  for index in range(len(money)):
    if profit > money[index]:
      result += (profit - money[index]) * rate[index]
      profit -= money[index] 
  print(result)

#learn002()
  
  
# 003
def learn003():
  for i in range(1,85):
    if 168 % i == 0:
      j = 168 / i
      if i > j and (i + j) % 2 == 0 and (i - j) % 2 == 0:
        n = (i - j) / 2
        x = n * n- 100
        print(int(x))

# learn003()
def isLeapYear(year:int) -> bool:
  if year % 400 ==0 or year % 4 == 0 and year % 100 != 0:
    return True
  else:
    return False

def learn004():
  inputY = int(input('年'))
  inputM = int(input('月'))
  inputD = int(input('日'))
  months = [None,0,31,59,90,120,151,181,212,243,273,304,334]
  day = months[inputM] + inputD
  if isLeapYear(inputY):
    day += 1
  return day

# print(learn004())



# 005 

def learn005():
  numList = []
  for i in range(3):
    x = int(input('输入第' + str(i) + '个数:'))
    numList.append(x)
  numList.sort()
  return numList
# print(learn005())


def learn005v2():
  numList = []
  flag = True
  while(flag):
    x = int(input('输入数字'))
    numList.append(x)
    isclose = input('是否结束? y/n:')
    if(isclose == 'y'):
      flag = False
  numList.sort()
  return numList  

# print(learn005v2())

# 006

def learn006(n):
  if n== 1 or n == 2:
    return 1
  return learn006(n-1) + learn006(n-2)
# print(learn006(10))




# 007  
def learn007(list):
  return list[:]

# print(learn007([1,2,3]))


# 008
def learn008():
  for i in range(1,9): 
    for j in range(1,i+1):
      print(str(i) + '*' + str(j) + '=' + str(i*j),end="   ")
    print('\n')
# learn008()


# 009
def learn009(n):
  import time
  for i in range(n):
    print(i)
    time.sleep(1)  

# learn009(4)


# 010
def learn010():
  import time
  nowtime = time.localtime(time.time())
  formatTime = time.strftime('%Y-%m-%d %H:%M:%S',nowtime)
  print('wait...')
  time.sleep(1)
  return formatTime
# print(learn010())

# 011
def learn011():
  m = int(input('输入月数'))
  def fib(n):
    if n == 1 or n == 2:
      return 2
    return fib(n-1) + fib(n-2)
  return fib(m)

# print(learn011())


# 012
def learn012():
  def isPrime(num):
    from math import sqrt
    for i in range(2,int(sqrt(num))+1):
      if  num % i == 0:
        return False
    return True
  primeList = []
  total = 0
  for i in range(101,201):
     if isPrime(i):
       total += 1
       primeList.append(i)
  print('总共' + str(total) + '个')
  print('分别是:',primeList)

# learn012()

# 013

def learn013():
  numlist = []
  for n in range(100,1000):
    i = n // 100
    j = (n - i * 100) // 10
    k = n - i*100 - j * 10
    if pow(i,3) + pow(j,3) + pow(k,3) == n:
      numlist.append(n)
  return numlist

# print(learn013())

def learn014(n):
  numlist = []
  def findMin(num):
    if num == 0:
      return
    for i in range(2,num+1):
      if num % i == 0:
        numlist.append(str(i))
        return findMin(num // i)
      
  findMin(n)
  if len(numlist) == 1:
    print('%d = %d * %d'%(n,numlist[0],1))
  else:
    print('%d = %s' %(n,'*'.join(numlist)))
# learn014(90)


# 015
def learn015():
  num = int(input('输入分数:'))
  if num >= 90:
    return 'A'
  elif num >= 60:
    return 'B'
  else:
    return 'C'

# print(learn015())

# 016
def learn016():
  import time
  localTime = time.localtime()
  print('本地时间:',localTime,end="\n\n")
  time1 = time.strftime('%y-%m-%d/%H:%M:%S',localTime)
  print('yy-mm-dd/hh-mm-ss:',time1,end="\n")
  time2 = time.strftime('%Y-%m-%d/%H:%M:%S  %A',localTime)
  print('yyyy-mm-dd/hh-mm-ss week:',time2)

# learn016()

# 017 
def learn017():
  inputStr = input('输入字符:')
  nums = {
    'alphaNum':0,
    'spaceNum':0,
    'numNum':0,
    'elseNum':0,
  }
  for s in inputStr:
    if s.isalpha():
      nums['alphaNum'] += 1
    elif s.isspace():
      nums['spaceNum'] += 1
    elif s.isdigit():
      nums['numNum'] += 1
    else:
      s['elseNum'] += 1
  return nums
# print(learn017())

# 018  
def learn018():
  n = int(input('n:'))
  a = int(input('a:'))
  a1 = a
  numList = []
  for i in range(n+1):
    numList.append(a1)
    a1 = 10 * a1 + a
  print('sum:',sum(numList))
  print(numList)

# learn018()

# 019  
def learn019():
  numlist = []
  def findNum(num):
    if num == 0:
      return
    for i in range(1,num // 2 + 1):
      if num % i == 0:
        numlist.append(i)
  result = []
  for n in range(2,1001):
    findNum(n)
    if sum(numlist) == n:
      print('%d = %s '%(n,' + '.join([str(s) for s in numlist])))
      # print('%d = %s '%(n,' + '.join(map(lambda s:str(s),numlist))))
      result.append(n)
    numlist = []
  return result
# print(learn019())


# 020  
def learn020():
  from math import pow
  h = int(input('输入高度:'))
  n = int(input('输入弹跳次数:'))
  nowh = h * pow(1/2,n-1)
  mSum = h * (1 - pow(1/2,n)) / (1 - 1/2 )
  print('第%d次的高度为%f' % (n,nowh))
  print('共经过%f米' % mSum)

# learn020()

# 021
def learn021():
  d = int(input('day:'))
  x = 0
  def peach(n,dNum):
    print('n',n)
    if dNum >= d:
      return n
    x = (n+1) * 2
    return peach(x,dNum + 1) 
  print(peach(1,1))
# learn021()


# 022 
def learn022():
  allGameType = {
    'a':['y','z'],
    'b':['x','y','z'],
    'c':['y']
  }
  def find1Len(itemDicList):
    for key in itemDicList:
      if len(itemDicList[key]) == 1:
        return key
    return 'notFound'
  result = []

  for item in allGameType:
    oneLen = find1Len(allGameType)
    needRemoveKey = allGameType[oneLen][0]
    result.append('%s --> %s'%(oneLen,needRemoveKey))
    for personTeamB in allGameType:
      if needRemoveKey in  allGameType[personTeamB]:
        allGameType[personTeamB].remove(needRemoveKey)
  return result
# print(learn022())

# 023 
def learn023():
  for i in range(4):
    for j in range(3-i):
      print(' ',end="")
    for k in range(2*i + 1):
      print('*',end="")
    print(' ',end="")
    print()

# learn023()

# 024
def learn024():
  n = int(input('多少项之和?'))
  t,b,s = 2,1,0
  for i in range(n):
    s += t/b
    temp = t
    t += b
    b = temp
  return s
# print(learn024())

# 025 
def learn025():
  s = 1
  sumNum = 0
  for i in range(1,21):
    s *= i
    sumNum += s
  return sumNum
# print(learn025())

# 026  
def learn026():
  def rec(num):
    if num == 1:
      return 1
    else:
      return num * rec(num-1)
  return rec(5)
# print(learn026())

# 027
def learn027():
  inputStr = input('输入str:')
  strLen = len(inputStr)
  def rec(s,l):
    if l == 0:
      return
    print(s[l-1])
    rec(s,l-1)
  rec(inputStr,strLen)

# learn027()

# 028
def learn028():
  personNum = int(input('第几个人'))
  def rec(n):
    if n == 1:
      c = 10
    else:
      c = rec(n-1)+2
    return c
  return rec(personNum)
# print(learn028())


# 029
def learn029():
  inputNum = int(input('输入一个数:'))
  strNum = str(inputNum)
  l = len(strNum)
  for s in strNum[::-1]:
    print('s:',s)
  return l
# print(learn029())

# 030
def learn030():
  n = int(input('输入一个数字'))
  strN = str(n)
  for i in range(len(strN)//2):
    if strN[i] != strN[-i-1]:
      return False
  return True
# print(learn030())
    

# 031
def learn031():
  weekList = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  def findDay(days,index):
    if len(days) == 1:
      return days
    inputStr = input('输入:')
    findDays = []
    for day in days:
      if day[index] == inputStr:
        findDays.append(day)
    return findDay(findDays,index + 1)
  return findDay(weekList,0)

# print(learn031())

# 032
def learn032():
  a = ['one', 'two', 'three']
  for i in a[::-1]:
    print(i)

# learn032()

# 033
def learn033():
  a = [1,2,3,4,5]
  print(','.join(str(n) for n in a))
  print(','.join(map(lambda e:str(e),a)))
# learn033()

# 035
def learn035():
  print("\033[1;31;40m\t黑底红字\033[0m")
  print('\033[4;32;47m\t下划线白低绿字\033[0m"')
# learn035()

# 036
def learn036():
  n = int(input('输入数字'))
  numlist = []
  for num in range(2,n+1):
    for i in range(2,num):
      if num % i == 0:
        break
    else:
      numlist.append(num)
  return numlist
# print(learn036())


# 037
def learn037():
  flag = True
  sortNum = []
  def appendToSortNums(n):
    i = 0
    while i < len(sortNum) and n > sortNum[i]:
      i += 1
    else:
      sortNum.insert(i,n)
      return
  while flag:
    num = int(input('输入一个数字:'))
    if len(sortNum) == 0:
      sortNum.append(num)
    else:
      appendToSortNums(num)
    isQuit = input('是否输入完毕? y/n:')
    if isQuit == 'y':
      flag = False
  return sortNum
# print(learn037())



# 038  
def learn038():
  a = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]
  numSum = 0
  for i in range(len(a)):
    for j in range(len(a[i])):
      if i == j:
        numSum += a[i][j]
  return numSum
# print(learn038())

# 040 
def learn040():
  numList = [1,2,3,4,5]
  for index in range(len(numList)-1,0-1,-1):
    print(numList[index])

# learn040()

# 041  
class learn041(object):
  a = 1
  b = 2
  def aAdd(self,num):
    print('num', num)
    self.a += self.b
    return self
  def getA(self):
    return self.a
# test = learn041()
# test.aAdd(1).aAdd(2).aAdd(3)
# print(test.getA())

# 042 
def learn042():
  a = 1
  b = 2
  c = []
  def fun1():
    # a += 1
    b = 3
    c.append('fun1C')
    print('fun1 -> a', a)
    print('fun1 -> b',b)
    print('fun1 -> c',c)
  fun1()
  print('a', a)
  print('b',b)
  print('c',c)

# learn042()

# 044
def learn044():
  X = [[12,7,3],
    [4 ,5,6],
    [7 ,8,9]]

  Y = [[5,8,1],
    [6,7,3],
    [4,5,9]]
  result = []
  for i in range(0,len(X)):
    row = []
    for j in range(0,len(X[i])):
      row.append(X[i][j] + Y[i][j])
    result.append(row)
  return result
# print(learn044())


# 045
def learn045():
  numSum = 0
  for i in range(1,101):
    numSum += i
  return numSum
# print(learn045())

# 049
def learn049():
  X = [[12,7,3],
    [4 ,5,6],
    [7 ,8,9]]

  Y = [
    [5,8,1],
    [6,7,3],
    [4,5,9]
    ]
  return list(map(lambda rowx,rowy:list(map(lambda colx,coly:colx + coly,rowx,rowy)),X,Y))
# print(learn049())

# 050
def learn050():
  import random
  print('random',random.random() * 100)
learn050()


