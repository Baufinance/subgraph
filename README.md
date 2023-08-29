### Сущности Vault

1. **Vault**: Представляет Vault. 
   - `id`: Уникальный идентификатор сущности. Формируется из адреса Vault
   - `vaultAddress`: Адрес хранилища
   - `name`, `symbol`, `decimals`: Имя, символ, и децималы волта
   - `lpToken`: LP Token который принимает Vault
   - `lpTokenName`: Имя LP token
   - `gauge`: Адрес gauge curve
   - `poolType`: Тип curve пула
   - `vaultInfo`: Текущее состояние Vault
   - `lpBreakDownSource`: Источник для получения информации необходимой для расчета TVL, tokens per 1 LP,pricer per 1LP
   - `strategies`: Стратегии, связанные с этим хранилищем
   - `updatedAtBlock`: Блок, на котором были последний раз обновлены эти данные

2. **VaultState**: Предоставляет информацию о состоянии Vault. 
   - `id`: Уникальный идентификатор сущности. Формируется из адреса Vault
   - `lastHarvest`: Последний раз, когда сработал Harvest
   - `totalAssets`: Общие активы под управлением Vault
   - `pricePerOneShare`: Текущая цена за однин share token, выраженная в LP token.
   - `harvests`: Массив событий harvest, связанных с этим хранилищем

3. **LPBreakdownSource**: Представляет информации об LP token. Сущность не мутабельная.
   - `id`: Уникальный идентификатор сущности. Формируется из адреса Vault
   - `vault`: Адрес vault с которому привязана сущность
   - `lpToken`: адрес lp token
   - `pool`: Адреса curve pool в котором был получен lpToken
   - `registry`: Адрес регистри, по которому можно получить необходимую информацию для расчетов LP Breakdown

4. **Strategy**: Содержит информацию о инвестиционных стратегиях, связанных с хранилищем.
   - `id`: Уникальный идентификатор сущности. Формируется из vault.id и strategyAddress.
   - `address`: Блокчейн-адрес стратегии
   - `isActive`: Является ли стратегия активной?
   - `debtRatio`, `minDebtPerHarvest`, `maxDebtPerHarvest`: Параметры, определяющие поведение долга стратегии

5. **Harvest**: Сущности которые хранят все события harvest на Vaults. 
   - `id`: Уникальный идентификатор сущности. Формируется из vault.id и updatedAtBlock.
   - `vault`: Адрес vault на котором произошел harvest
   - `pricePerShare`: Цена за однин share token, выраженная в LP token, полученная после harvest.
   - `reportInfo`: Сущность которая детальные данные каждого harvest.

6. **ReportInfo**: Сущность которая отображает детальную информации о событии harvest.
   - `id`: Уникальный идентификатор сущности. Формируется HarvestId.
   - `strategy`: Адрес стратегии по которой был сделан отчет
   - `gain`, `loss`, `debtPaid`, `totalGain`, `totalLoss`, `totalDebt`, `debtAdded`, `debtRatio`: Информация о прибыли, потери, и долге стратегии
   
---

### Сущности User

1. **User**: Представляет пользователя в системе. 
   - `id`: Уникальный идентификатор сущности. Формируется из адреса пользователя
   - `updatedAtBlock`: Блок в котором создалась сущность
   - `deposits`: Массив депозитов, сделанных пользователем
   - `transactions`: Массив транзакций, проведенных пользователем
  
2. **UserDeposit**: Представляет депозит, сделанный пользователем в Vault.
   - `id`: Уникальный идентификатор сущности. Формируется из user.id и vault.id
   - `user`: Пользователь который сделал депозит
   - `vault`: Vault в который пользователь сделал депозит
   - `updatedAtBlock`: Блок, в котором был сделан депозит
   - `states`: Массив состояний всех депозитов пользователя
   - `lastUserDepositState`: Самое последнее состояние депозита(баланса) пользователя
  

3. **UserDepositState**: Представляет состояние депозита пользователя.
   - `id`: Уникальный идентификатор сущности. Формируется из deposit.id и updatedAtBlock
   - `deposit`: Депозит, к которому относится это состояние
   - `lpTokenAmount`: Количество lp token после депозита
   - `shareTokenAmount`: Количество share токенов пользователя после депозита
   - `pricePerShare`: Текущая цена за однин share token, выраженная в LP token
   - `block`: Сущность блок в которым было изменение депозита
   - `updatedAtBlock`: Номер блока

4. **LastUserDepositState**: Представляет последнее состояние депозита(баланса) пользователя.
   - `id`: Уникальный идентификатор сущности. Формируется из deposit.id
   - `deposit`: Депозит пользователя
   - `state`: Последнее состояние депозита пользователя

---

### Сущности BLOCKCHAIN

1. **Transaction**: Информация о транзакции.
   - `id`: Уникальный идентификатор сущности. Формируется из transaction hash
   - `index`: Индекс транзакции
   - `user`: Пользователь который создал транзакцию
   - `vault`: Vault к которому относится транзакция
   - `block`: Сущность блок в которым была образована транзакция
   - `updatedAtBlock`: Номер блока  в котором создана сущность

2. **Block**: Информация о конкретном блоке на блокчейне.
   - `id`: Уникальный идентификатор сущности. Формируется из номера блока
   - `number`: Номер блока
   - `timeUnix`: Временная метка блока в формате Unix
   - `updatedAtBlock`: Номер блока  в котором создана сущность

3. **Token**: Общие данные о типе токена.
   - `id`: Уникальный идентификатор сущности. Формируется из адреса токена
   - `name`, `symbol`: Имя и символ для токена
   - `decimals`: Децималы токена

---

### Поиск

- **_Schema_**: Определяет параметры полнотекстового поиска по сущности Vault.

---

Подключение к frontend можно посмотреть [тут](https://docs.google.com/document/d/192cIsaQ60wBSswtJft4T0NuqbnaQ4ecjMS4FH9T7v6g/edit?usp=sharing)