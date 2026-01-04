import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';

const Index = () => {
  const [balance, setBalance] = useState(15420.50);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'price', text: 'AK-47 | Redline снизился до $45', time: '2 мин назад', active: true },
    { id: 2, type: 'new', text: 'Новый Dragon Lore в каталоге!', time: '15 мин назад', active: true },
    { id: 3, type: 'trade', text: 'Ваше предложение принято', time: '1 час назад', active: false },
  ]);

  const skins = [
    { id: 1, name: 'AK-47 | Redline', rarity: 'legendary', price: 45.30, trend: 'down', wear: 'FT', image: '🔫' },
    { id: 2, name: 'AWP | Dragon Lore', rarity: 'covert', price: 4820.00, trend: 'up', wear: 'FN', image: '🐉' },
    { id: 3, name: 'Karambit | Fade', rarity: 'rare', price: 1250.00, trend: 'up', wear: 'MW', image: '🔪' },
    { id: 4, name: 'M4A4 | Howl', rarity: 'covert', price: 3200.00, trend: 'neutral', wear: 'FT', image: '🔥' },
    { id: 5, name: 'Glock-18 | Fade', rarity: 'legendary', price: 285.50, trend: 'up', wear: 'FN', image: '💎' },
    { id: 6, name: 'Desert Eagle | Blaze', rarity: 'rare', price: 420.00, trend: 'down', wear: 'FN', image: '⚡' },
  ];

  const inventory = [
    { id: 1, name: 'AK-47 | Vulcan', rarity: 'legendary', price: 125.00, wear: 'MW', image: '⚡' },
    { id: 2, name: 'USP-S | Kill Confirmed', rarity: 'rare', price: 85.00, wear: 'FT', image: '💀' },
    { id: 3, name: 'Butterfly Knife | Slaughter', rarity: 'covert', price: 2100.00, wear: 'FN', image: '🦋' },
  ];

  const topTraders = [
    { id: 1, name: 'ProTrader228', trades: 1543, profit: 125420, avatar: '👑' },
    { id: 2, name: 'SkinMaster', trades: 1221, profit: 98750, avatar: '💰' },
    { id: 3, name: 'DragonHunter', trades: 980, profit: 87320, avatar: '🐉' },
    { id: 4, name: 'KnifeCollector', trades: 856, profit: 76540, avatar: '🔪' },
    { id: 5, name: 'AWPer', trades: 743, profit: 65890, avatar: '🎯' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'covert': return 'text-red-500';
      case 'legendary': return 'text-purple-500';
      case 'rare': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <Icon name="TrendingUp" size={16} className="text-secondary" />;
      case 'down': return <Icon name="TrendingDown" size={16} className="text-destructive" />;
      default: return <Icon name="Minus" size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold">
                <span className="text-primary neon-glow">SKINS</span>
                <span className="text-secondary neon-glow">FARM</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </Button>
              <Card className="px-4 py-2 bg-card/80 border-primary/30">
                <div className="flex items-center gap-2">
                  <Icon name="Wallet" size={20} className="text-secondary" />
                  <span className="font-bold text-lg">${balance.toFixed(2)}</span>
                </div>
              </Card>
              <Avatar className="border-2 border-primary">
                <AvatarFallback className="bg-primary/20 text-primary">PT</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="catalog" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto bg-card border border-border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="catalog" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Grid3x3" size={18} className="mr-2" />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Package" size={18} className="mr-2" />
              Инвентарь
            </TabsTrigger>
            <TabsTrigger value="trades" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ArrowLeftRight" size={18} className="mr-2" />
              Торговля
            </TabsTrigger>
            <TabsTrigger value="rating" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Trophy" size={18} className="mr-2" />
              Рейтинг
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card border-border hover-glow border-primary/30">
                <div className="text-center space-y-4">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-primary">
                    <AvatarFallback className="bg-primary/20 text-primary text-3xl">PT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">ProTrader</h2>
                    <p className="text-muted-foreground">Активен 2 часа назад</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Badge className="bg-primary/20 text-primary border-primary/50">Легенда</Badge>
                    <Badge className="bg-secondary/20 text-secondary border-secondary/50">VIP</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border hover-glow border-secondary/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-secondary" />
                  Статистика
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Всего сделок</span>
                    <span className="font-bold text-xl">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Общая прибыль</span>
                    <span className="font-bold text-xl text-secondary">+$12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Средняя цена</span>
                    <span className="font-bold text-xl">$320</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Рейтинг</span>
                    <span className="font-bold text-xl text-accent">#23</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border hover-glow border-accent/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Star" className="text-accent" />
                  Избранные скины
                </h3>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {['AK-47 | Fire Serpent', 'AWP | Medusa', 'Karambit | Doppler', 'M4A1-S | Hot Rod'].map((skin, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
                        <span className="text-sm">{skin}</span>
                        <Icon name="Heart" size={16} className="text-accent fill-accent" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>

            <Card className="p-6 bg-card border-border hover-glow border-primary/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Bell" className="text-primary" />
                Уведомления
              </h3>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {notif.type === 'price' && <Icon name="DollarSign" size={20} className="text-accent" />}
                      {notif.type === 'new' && <Icon name="Sparkles" size={20} className="text-secondary" />}
                      {notif.type === 'trade' && <Icon name="ArrowLeftRight" size={20} className="text-primary" />}
                      <div>
                        <p>{notif.text}</p>
                        <p className="text-sm text-muted-foreground">{notif.time}</p>
                      </div>
                    </div>
                    <Switch checked={notif.active} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <div className="flex gap-4 items-center">
              <Input placeholder="Поиск по названию..." className="max-w-md bg-card border-border" />
              <Button variant="outline" className="border-primary/30">
                <Icon name="Filter" size={18} className="mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" className="border-secondary/30">
                <Icon name="ArrowUpDown" size={18} className="mr-2" />
                Сортировка
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skins.map((skin) => (
                <Card key={skin.id} className="p-0 bg-card border-border overflow-hidden hover-glow group cursor-pointer">
                  <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                    <div className="text-7xl group-hover:scale-110 transition-transform">{skin.image}</div>
                    <Badge className={`absolute top-3 right-3 ${getRarityColor(skin.rarity)} bg-background/80`}>
                      {skin.rarity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg">{skin.name}</h3>
                      <p className="text-sm text-muted-foreground">{skin.wear}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-secondary">${skin.price}</span>
                        {getTrendIcon(skin.trend)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-primary hover:bg-primary/80">
                        Купить
                      </Button>
                      <Button variant="outline" size="icon" className="border-accent/30">
                        <Icon name="Heart" size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Ваш инвентарь</h2>
                <p className="text-muted-foreground">Всего предметов: {inventory.length}</p>
              </div>
              <Button className="bg-secondary hover:bg-secondary/80">
                <Icon name="Plus" size={18} className="mr-2" />
                Пополнить
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory.map((skin) => (
                <Card key={skin.id} className="p-0 bg-card border-border overflow-hidden hover-glow group">
                  <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                    <div className="text-7xl group-hover:scale-110 transition-transform">{skin.image}</div>
                    <Badge className={`absolute top-3 right-3 ${getRarityColor(skin.rarity)} bg-background/80`}>
                      {skin.rarity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg">{skin.name}</h3>
                      <p className="text-sm text-muted-foreground">{skin.wear}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-secondary">${skin.price}</span>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/80">
                      <Icon name="Tag" size={18} className="mr-2" />
                      Продать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trades" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border hover-glow border-secondary/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Clock" className="text-secondary" />
                  Активные предложения
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">AK-47 | Vulcan</p>
                        <p className="text-sm text-muted-foreground">MW • Выставлен на продажу</p>
                      </div>
                      <Badge className="bg-secondary/20 text-secondary">$125.00</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Снять
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Изменить цену
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border hover-glow border-primary/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="History" className="text-primary" />
                  История сделок
                </h3>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {[
                      { item: 'Desert Eagle | Blaze', action: 'Продано', price: 420, profit: 45, time: '2 часа назад' },
                      { item: 'Glock-18 | Fade', action: 'Куплено', price: 285, profit: -285, time: '5 часов назад' },
                      { item: 'AK-47 | Redline', action: 'Продано', price: 45, profit: 12, time: '1 день назад' },
                    ].map((trade, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/30 space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{trade.item}</span>
                          <span className={trade.profit > 0 ? 'text-secondary' : 'text-destructive'}>
                            {trade.profit > 0 ? '+' : ''}${Math.abs(trade.profit)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{trade.action} • ${trade.price}</span>
                          <span>{trade.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rating" className="space-y-6">
            <Card className="p-6 bg-card border-border hover-glow border-accent/30">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Trophy" className="text-accent neon-glow" />
                Топ трейдеров
              </h3>
              <div className="space-y-4">
                {topTraders.map((trader, index) => (
                  <div key={trader.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
                    <div className="text-3xl font-bold text-muted-foreground w-12 text-center">
                      {index === 0 && <span className="text-accent neon-glow">🥇</span>}
                      {index === 1 && <span className="text-primary neon-glow">🥈</span>}
                      {index === 2 && <span className="text-secondary neon-glow">🥉</span>}
                      {index > 2 && `#${index + 1}`}
                    </div>
                    <Avatar className="w-12 h-12 border-2 border-primary">
                      <AvatarFallback className="text-2xl">{trader.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold">{trader.name}</p>
                      <p className="text-sm text-muted-foreground">{trader.trades} сделок</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary text-lg">+${trader.profit.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Прибыль</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
