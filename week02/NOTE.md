#第二周总结

## 1、通识
###语言分类###
####非形式化语言####
Python：我们无法定义行首的概念。
####形式化语言####
1. 无限制文法
2. 上下文相关文法
3. 上下文无关文法
4. 正则文法

它们是包含关系$$4\subset3\subset2\subset1.$$

我们的JavaScript是整体上是属于上下文无关的语言，像`get`就属于上下文有关的文法。

##2、JavaScript类型
在JavaScript中共有7种基本类型:
- Number
- String
- Boolean
- Object
- Undefined
- Null
- Symbol

### Number
数字类型是根据`IEEE754-2019`的中的`Double Float`来定义的，它总共有18437736874454810627个值。

`Double Float`是由1个符号位，11个指数位，和52个分数位组成的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706203523237.png#pic_center)

它有如下几个特征：
 - 符号位只能为0或者1，0代表正数，1代表负数（有+0和-0）;
 - 指数位为1023时，代表2的0次方；
 - 分数为第一位永远为一；

### String

JavaScript是使用code point表示字符的一个字符对应一个code point。

$$ 0 1 1 0 0 0 0 1 \to 97 \to a$$

它应该是一个一一对应关系。

编码有许多的标准，最早的是`ASCII`码，只有127个字符。后来为了迎合不同语言的需要，发展出了`Unicode`。

### Boolean
只有`true`和`false`,他们俩都是关键词。


### Undefined
`Undefined`代表没被初始化的元素，它是可以被赋值的，当然由于它是不可写的，一般赋值会失效。
产生`Undefiend`最好的方法就是使用`void`后面加任何值，不过习惯上我们写作`void 0`。

### Null
`Null`代表有值，不过这个值为空，它是一个关键字。

### Symbol
`Symbol`可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性值。

### Object
JavaScript的对象有标识，状态和行为。不过在JS中，由于函数也可以是对象的属性，所以它既可以描述行为也可以描述状态。

不同于其他面向对象语言,JS采用通过原型而不是分类来描述对象，在创建继承关系的过程中，最好使用简单易懂的`new class extends`而不是通过`function prototype`这种方法。因为第二种并不容易被理解。

## 3、OOP
要了解面对对象编程，我们先要知道对象是什么。对象具有唯一的标识，状态和行为。两个属性相同的对象不是一个对象。
```javascript
class Person{
	constructer(name){
		this.name = name;
	}
}

let per1 = new Person("1");
let per2 = new Person("2");
console.log(per1 === per2) //false
```

并且对象的状态最好只能由对象的行为来改变，比如说狗咬人，不应当让狗来改变人的状态。

