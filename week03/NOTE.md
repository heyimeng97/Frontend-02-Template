#第三周总结


##运算优先级（由高至低）
1. Member（Left) 
	- `a.b` `a[b]` 
	- `foo string`
	- `super.b` `super[b]`
	- `new.target`
	- `new fun()`
2. Call
	- `foo()`
 	- `super()`
	- `foo()['b']`
	- `foo().b`
	- `foo()abc`(反引号)
3. Update(Right)
	- `a++`
	- `a--`
	- `--a`
	- `++a`
4. Unary
	- `delete`
	- `void foo()`
	- `typeof a`
	- `+a`
	- `-a`
	- `~a`
	- `!a`
	- `await a`
5. **`** `唯一的右结合**
6. Multiplicative
	- `* / %`
7. Additive
	- `+ -`
8. Shift
	- `<< >> >>>`
9. RelationShip
	-`< > <= >= instanceof in`
10. Equality
	- `==`
	- `!=`
	- `===`
	- `!==`
11. Bitwise
	- `& ^ |`
12. Logical
	- `&& ||`
13. Conditional
	- `?:`

##类型转换


- Number和String不能相互转换
- Undefined和Null不能装箱

对于`Object`来说,计算时会将它自动拆箱，这会涉及到`ToPremitive`的过程。

对于Number用Valueof();

对于String用toString();

##运行时
###Completion Record
`[[type]]` `[[value]]`

`[[target]]`：是一个label用来控制break跳转的。

##语法
###简单语句
- ExpressionStatement
- EmptyStatement
- DebbuggerStatement
- ThrowStatement
- ContinueStatement
- BreakStatement
- ReturnStatement
###复合语句
- Block
- If
- Switch
- Iteration
- With
- Labelled
- Try
###声明
