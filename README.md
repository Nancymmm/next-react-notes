### 服务端组件可以导入客户端组件，但客户端组件并不能导入服务端组件（即在服务端组件中引入客户端组件,从服务端组件到客户端组件传递的数据需要可序列化）

### 从服务端组件到客户端组件传递的数据需要可序列化（传入函数不可以），但可以将服务端组件以 props 的形式传给客户端组件

![alt text](image.png)
![alt text](image-1.png)

### 在这段代码中，`SidebarNoteItem` 是一个服务端组件，在这个组件中我们引入了 dayjs 这个库，然而我们却是在 `SidebarNoteItemContent` 这个客户端组件中使用的 dayjs。请问最终客户端的 bundle 中是否会打包 dayjs 这个库？

### 答案是不会。**在服务端组件中使用 JSX 作为传递给客户端组件的 prop，JSX 会先进行服务端组件渲染，再发送到客户端组件中**。

![alt text](image-2.png)

### 尽可能将客户端组件在组件树中下移,避免依赖库被打包到客户端 bundle 中

### 使用 Suspense，数据加载不会阻塞页面，在笔记列表还在加载的时候，用户依然可以与页面其他部分进行交互，比如点击 New 按钮新建笔记。（即不用 suspense 就会卡顿，像无响应，用 suspense 可以出现其他加载的）

![image](https://github.com/user-attachments/assets/b429b2e3-5d51-492c-a8a7-3449e7a89e77)

### 要对 content 类型做判断，否则报错

### RSC Payload 服务端是逐行返回，客户端是逐行解析、渐进式渲染的。Link 组件有预获取

### 那客户端获取到 RSC Payload 后还干了什么呢？其实就是根据 RSC Payload 重新渲染组件树，修改 DOM。但使用 RSC Payload 的好处在于组件树中的状态依然会被保持，比如左侧笔记列表的展开和收回就是一种客户端状态，当你新增笔记、删除笔记时，虽然组件树被重新渲染，但是客户端的状态依然会继续保持了。

### SSR 和 RSC 的最大区别，在于服务端组件没有被渲染成 HTML，而是一种特殊的格式（RSC Payload）。SSR（传统的 SSR，想想 Pages Router 下的 SSR 实现） 和 RSC 的区别：RSC 的代码不会发送到客户端，但传统 SSR 所有组件的代码都会被发送到客户端, RSC 可以在组件树中任意位置获取后端，传统 SSR 只能在顶层（getServerSideProps）访问后端,服务器组件可以重新获取，而不会丢失其树内的客户端状态

### Next.js 客户端路由缓存功能，客户端会缓存 RSC Payload 数据,路由缓存存放在浏览器的临时缓存中，有两个因素决定了路由缓存的持续时间：Session，缓存在导航期间会持续存在，当页面刷新的时候会被清除; 自动失效期：单个路由段会在特定时长后自动失效，如果路由是静态渲染，持续 5 分钟，如果是动态渲染，持续 30s.

### 小问题：以这个项目为例，如果点击笔记的时间算成 0s，因为请求时长大于 5s，假设 RSC Payload 在第 5s 完全返回，下次路由缓存失效重新获取的时间是大概在 30s 后还是 35s 后呢？答案是 30s。以 RSC Payload 的返回时间为准，RSC Payload 是逐行返回的，所以点击的时候很快就有返回了。(以返回时间为主，不是完全返回时间)

### 进行数据处理的时候，一定要记得重新验证数据，也就是 [revalidatePath] 和 [revalidateTag]

### React 的 [useFormState] 和 [useFormStatus] 非常适合搭配 Server Actions 使用。`useFormState` 用于根据 form action 的结果更新表单状态，`useFormStatus` 用于在提交表单时显示待处理状态。
