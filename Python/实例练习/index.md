
python练习100题    

[题目来源](https://www.runoob.com/python/python-100-examples.html)    

[代码地址](https://github.com/lxhyl/lxhyl.github.io/blob/master/Python/%E5%AE%9E%E4%BE%8B%E7%BB%83%E4%B9%A0/index.py)  

# 001   
有四个数字：1、2、3、4，能组成多少个互不相同且无重复数字的三位数？各是多少？  

```py
def learn001 ():
  ran = range(1,5)
  resultList = []
  for i in ran:
    for j in ran:
      for k in ran:
        if(i != j) and (j != k):
          resultList.append([i,j,k])
  print(resultList)
```

# 002   
企业发放的奖金根据利润提成。利润(I)低于或等于10万元时，奖金可提10%；利润高于10万元，低于20万元时，低于10万元的部分按10%提成，高于10万元的部分，可提成7.5%；20万到40万之间时，高于20万元的部分，可提成5%；40万到60万之间时高于40万元的部分，可提成3%；60万到100万之间时，高于60万元的部分，可提成1.5%，高于100万元时，超过100万元的部分按1%提成，从键盘输入当月利润I，求应发放奖金总数？  

```py
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
```

# 003 
一个整数，它加上100后是一个完全平方数，再加上168又是一个完全平方数，请问该数是多少？   

> 不会写数学题了...看了解析才恍然大悟

```py
def learn003():
  for i in range(1,85):
    if 168 % i == 0:
      j = 168 / i
      if i > j and (i + j) % 2 == 0 and (i - j) % 2 == 0:
        n = (i - j) / 2
        x = n * n- 100
        print(int(x))
```


# 004   
输入某年某月某日，判断这一天是这一年的第几天？  
```py
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
```

# 005   
输入三个整数x,y,z，请把这三个数由小到大输出  
```js
def learn005():
  numList = []
  for i in range(3):
    x = int(input('输入第' + str(i) + '个数:'))
    numList.append(x)
  numList.sort()
  return numList
print(learn005())   
```
> 进阶一下，输入任意多数字
```py
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

print(learn005v2())
```


# 006   
斐波那契数列    
```py
def learn006(n):
  if n== 1 or n == 2:
    return 1
  return learn006(n-1) + learn006(n-2)
print(learn006(10))
```

# 007  
将一个列表的数据复制到另一个列表中  
```py
def learn007(list):
  return list[:]

print(learn007([1,2,3]))
```

# 008   
输出 9*9 乘法口诀表 
```py
def learn008():
  for i in range(1,9): 
    for j in range(1,i+1):
      print(str(i) + '*' + str(j) + '=' + str(i*j),end="   ")
    print('\n')
```

# 009    

暂停一秒输出  
```py
def learn009(n):
  import time
  for i in range(n):
    print(i)
    time.sleep(1)  

# learn009(4)
```

# 010    
暂停一秒输出，并格式化当前时间    
```py
def learn010():
  import time
  nowtime = time.localtime(time.time())
  formatTime = time.strftime('%Y-%m-%d %H:%M:%S',nowtime)
  print('wait...')
  time.sleep(1)
  return formatTime

print(learn010())
```

# 011    
古典问题：有一对兔子，从出生后第3个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问每个月的兔子总数为多少？  

> 写出来才发现是斐波那契数列  

```py
def learn011():
  m = int(input('输入月数'))
  def fib(n):
    if n == 1 or n == 2:
      return 2
    return fib(n-1) + fib(n-2)
  return fib(m)

# print(learn011())
```


# 012   
判断101-200之间有多少个素数，并输出所有素数。  

```py
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
```

# 013  
打印出所有的"水仙花数"，所谓"水仙花数"是指一个三位数，其各位数字立方和等于该数本身。例如：153是一个"水仙花数"，因为153=1的三次方＋5的三次方＋3的三次方。
```py
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
```

# 014
将一个正整数分解质因数。例如：输入90,打印出90=2*3*3*5。  
```py
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
learn014(90)
```

分解质因数算法，从最小的质因数开始，递归就行。  

* python 中的`//`才是整除,需要注意下，否则`range`函数接收到float参数会失败  
* join方法是字符串才有的,所以列表转字符串应该使用`''.join(list)`  


# 015   
利用条件运算符的嵌套来完成此题：学习成绩>=90分的同学用A表示，60-89分之间的用B表示，60分以下的用C表示。  
```py
def learn015():
  num = int(input('输入分数:'))
  if num >= 90:
    return 'A'
  elif num >= 60:
    return 'B'
  else:
    return 'C'
```

# 016   

输出指定格式的日期   
```py
def learn016():
  import time
  localTime = time.localtime()
  print('本地时间:',localTime,end="\n\n")
  time1 = time.strftime('%y-%m-%d/%H:%M:%S',localTime)
  print('yy-mm-dd/hh-mm-ss:',time1,end="\n")
  time2 = time.strftime('%Y-%m-%d/%H:%M:%S  %A',localTime)
  print('yyyy-mm-dd/hh-mm-ss week:',time2)
```

更多可见[日期](https://www.runoob.com/python/python-date-time.html)  

# 017  
输入一行字符，分别统计出其中英文字母、空格、数字和其它字符的个数。  
```py
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
```

# 018   
求s=a+aa+aaa+aaaa+aa...a的值，其中a是一个数字。例如2+22+222+2222+22222(此时共有5个数相加)，几个数相加由键盘控制。
 
```py
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
```

* `sum`函数的参数为`list`

# 019   
一个数如果恰好等于它的因子之和，这个数就称为"完数"。例如6=1＋2＋3.编程找出1000以内的所有完数。  

```py
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
print(learn019())
```

* 使用`fn(item) for item in list`可以对列表每个元素执行`fn`函数操作，返回一个新列表

* 也可使用map进行遍历，`map(fn,iterable,...)`,第一个参数`fn`是对`item`执行`fn(item)`操作，后面其他参数是可迭代对象，会把可迭代对象的`item`作为参数传入`fn`中  

**如上例**  
```py 
map(lambda s:str(s),numlist)
```
和js的map很像

# 020     
一球从100米高度自由落下，每次落地后反跳回原高度的一半；再落下，求它在第10次落地时，共经过多少米？第10次反弹多高？   

```py
def learn020():
  from math import pow
  h = int(input('输入高度:'))
  n = int(input('输入弹跳次数:'))
  nowh = 100 * pow(1/2,n-1)
  mSum = 100 * (1 - pow(1/2,n)) / (1 - 1/2 )
  print('第%n次的高度为%f' % (n,nowh))
  print('共经过%f米' % mSum)
learn020()
```
其实就是等比数列


# 021  

猴子吃桃问题：猴子第一天摘下若干个桃子，当即吃了一半，还不瘾，又多吃了一个第二天早上又将剩下的桃子吃掉一半，又多吃了一个。以后每天早上都吃了前一天剩下的一半零一个。到第10天早上想再吃时，见只剩下一个桃子了。求第一天共摘了多少。
```py
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
learn021()
```

# 022   
两个乒乓球队进行比赛，各出三人。甲队为a,b,c三人，乙队为x,y,z三人。已抽签决定比赛名单。有人向队员打听比赛的名单。a说他不和x比，c说他不和x,z比，请编程序找出三队赛手的名单。

```py
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
print(learn022()) 
# ['c --> y', 'a --> z', 'b --> x']
```

每次找到已经确定了对手的一项，然后在其他可能性中移除即可


# 023    

打印出如下图案  
```js
   *
  ***
 *****
*******
 *****
  ***
   *
```

```py
def learn023():
  for i in range(4):
    for j in range(3-i):
      print(' ',end="")
    for k in range(2*i + 1):
      print('*',end="")
    print(' ',end="")
    print()
```

# 024  
有一分数序列：2/1，3/2，5/3，8/5，13/8，21/13...求出这个数列的前20项之和。   
```py
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
```

# 025  
求1+2!+3!+...+20!的和。  
```py
def learn025():
  s = 1
  sumNum = 0
  for i in range(1,21):
    s *= i
    sumNum += s
  return sumNum
# print(learn025())
```

# 026
利用递归方法求5!。  
```py
def learn026():
  def rec(num):
    if num == 1:
      return 1
    else:
      return num * rec(num-1)
  return rec(5)
# print(learn026())
```

# 027  
利用递归函数调用方式，将所输入的5个字符，以相反顺序打印出来  
```py
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
```

# 028 
有5个人坐在一起，问第五个人多少岁？他说比第4个人大2岁。问第4个人岁数，他说比第3个人大2岁。问第三个人，又说比第2人大两岁。问第2个人，说比第一个人大两岁。最后问第一个人，他说是10岁。请问第五个人多大？  
```py
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
```

# 029 
给一个不多于5位的正整数，要求：一、求它是几位数，二、逆序打印出各位数字。  
```py
def learn029():
  inputNum = int(input('输入一个数:'))
  strNum = str(inputNum)
  l = len(strNum)
  for s in strNum[::-1]:
    print('s:',s)
  return l
# print(learn029())
```

# 030 
一个5位数，判断它是不是回文数。即12321是回文数，个位与万位相同，十位与千位相同  
```py
def learn030():
  n = int(input('输入一个数字'))
  strN = str(n)
  for i in range(len(strN)//2):
    if strN[i] != strN[-i-1]:
      return False
  return True
# print(learn030())
```

# 031
请输入星期几的第一个字母来判断一下是星期几，如果第一个字母一样，则继续判断第二个字母  
```py
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
```

# 032  
按相反的顺序输出列表的值  
```py
def learn032():
  a = ['one', 'two', 'three']
  for i in a[::-1]:
    print(i)
# learn032()
```

# 033 
按逗号分隔列表。  
```py
def learn033():
  a = [1,2,3,4,5]
  print(','.join(str(n) for n in a))
  print(','.join(map(lambda e:str(e),a)))
learn033()
```

# 034
练习函数调用  
`jump`

# 035
文本颜色设置  
```py
def learn034():
  print("\033[1;31;40m\t黑底红字\033[0m")
  print('\033[4;32;47m\t下划线白低绿字\033[0m"')
# learn034()
```

# 036
求100之内的素数
```py
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
```

# 037  
对输入的数进行排序
```py
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
```

# 038   

求一个3*3矩阵主对角线元素之和  
```py
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
```

# 039    
有一个已经排好序的数组。现输入一个数，要求按原来的规律将它插入数组中

**插入排序没啥好说的**  见[037](/python/实例练习/index?id=_037)题 

# 040   
将一个数组逆序输出

```py
def learn040():
  numList = [1,2,3,4,5]
  for index in range(len(numList)-1,0-1,-1):
    print(numList[index])

# learn040()
```

* `range`函数的第三个参数可以设定步长，-1即为倒序

# 041    
模仿静态变量的用法  

```py
class learn041(object):
  print('object', object)
  a = 1
  b = 2
  def aAdd(self,num):
    print('num', num)
    self.a += self.b
    return self
  def getA(self):
    return self.a
test = learn041()
test.aAdd(1).aAdd(2).aAdd(3)
print(test.getA())
```

* 类里面函数的第一个参数是self   


# 042  

auto搜了半天只在枚举中搜到了， 此题应该学习的是作用域方面的知识    

```py
def learn042():
  a = 1
  b = 2
  c = []
  def fun1():
    # a += 1 报错 需要先声明
    b = 3
    c.append('fun1C')
    print('fun1 -> a', a)
    print('fun1 -> b',b)
    print('fun1 -> c',c)
  fun1()
  print('a', a)
  print('b',b)
  print('c',c)
``` 
更多作用域方面的知识见[深入理解Python之作用域解析](https://zhuanlan.zhihu.com/p/50174320)   

# 043  
和[042题](/python/实例练习/index?id=_042)同理   

# 044    
两个 3 行 3 列的矩阵，实现其对应位置的数据相加，并返回一个新矩阵  
```py
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
print(learn044())
```

# 045   
统计 1 到 100 之和  
```py
def learn045():
  numSum = 0
  for i in range(1,101):
    numSum += i
  return numSum
print(learn045())
```

# 046  
太简单，略。 太简单的就只写题号了...

# 047 

# 048 

# 049  
使用lambda来创建匿名函数  
```py
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
print(learn049())
```

使用lambda来解决[044题](/python/实例练习/index?id=_044)

# 050
输出一个随机数  
```py
def learn050():
  import random
  print('random',random.random() * 100)
learn050()
```
更多可见[random模块](https://docs.python.org/zh-cn/3/library/random.html)

# 051 
# 052  
# 053  
# 054
# 055

