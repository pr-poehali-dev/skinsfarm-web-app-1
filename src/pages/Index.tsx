import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [playerPhoto, setPlayerPhoto] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerNick, setPlayerNick] = useState('');
  const [balance, setBalance] = useState(0);
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const tasks = [
    { id: 1, title: 'Подписаться на YouTube', reward: 20, link: 'https://youtube.com/@sckovel_official?si=dqlHqDXdTVd1ebGl', icon: '🎥' },
    { id: 2, title: 'Подписаться на Telegram канал', reward: 15, link: 'https://t.me/channelSckovel', icon: '📢' },
    { id: 3, title: 'Вступить в Telegram группу', reward: 35, link: 'https://t.me/+Xt-7Q0eULC5hNGZi', icon: '👥' },
  ];

  const skins = [
    { id: 1, name: 'G22 Flock', price: 15, sellPrice: 2.15, image: '🔫', rarity: 'common' },
    { id: 2, name: 'UMP-45 Arid StarTrack', price: 35, sellPrice: 25, image: '⚡', rarity: 'rare' },
    { id: 3, name: 'USP Ghost', price: 15, sellPrice: 2.15, image: '👻', rarity: 'common' },
  ];

  const [inventory, setInventory] = useState<typeof skins>([]);

  const promoCodes: Record<string, number> = {
    'START10': 10,
    'WELCOME25': 25,
    'BONUS50': 50,
    'MEGA90': 90,
  };

  const handleRegister = async () => {
    if (!playerPhoto || !playerId || !playerNick) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    try {
      await fetch('https://functions.poehali.dev/35b6780a-4cd3-4c09-9893-d462c3a83e6a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerNick: playerNick,
          playerId: playerId,
          playerPhoto: playerPhoto
        })
      });
    } catch (error) {
      console.log('Email notification failed:', error);
    }

    setIsRegistered(true);
    toast({ title: 'Успешно!', description: 'Добро пожаловать в SkinsFarm!' });
  };

  const handleTaskComplete = (taskId: number, reward: number, link: string) => {
    if (completedTasks.includes(taskId)) {
      toast({ title: 'Уже выполнено', description: 'Вы уже получили награду', variant: 'destructive' });
      return;
    }
    window.open(link, '_blank');
    setTimeout(() => {
      setCompletedTasks([...completedTasks, taskId]);
      setBalance(balance + reward);
      toast({ title: `+${reward} монет!`, description: 'Задание выполнено' });
    }, 2000);
  };

  const handlePromoActivate = () => {
    const reward = promoCodes[promoCode.toUpperCase()];
    if (reward) {
      setBalance(balance + reward);
      toast({ title: `+${reward} монет!`, description: 'Промокод активирован' });
      setPromoCode('');
      setPromoDialogOpen(false);
    } else {
      toast({ title: 'Ошибка', description: 'Неверный промокод', variant: 'destructive' });
    }
  };

  const handleBuySkin = (skin: typeof skins[0]) => {
    if (balance >= skin.price) {
      setBalance(balance - skin.price);
      setInventory([...inventory, skin]);
      toast({ title: 'Куплено!', description: `${skin.name} добавлен в инвентарь` });
    } else {
      toast({ title: 'Недостаточно монет', description: `Нужно ${skin.price} монет`, variant: 'destructive' });
    }
  };

  const handleSellSkin = (skinIndex: number) => {
    const skin = inventory[skinIndex];
    if (skin) {
      setBalance(balance + skin.sellPrice);
      setInventory(inventory.filter((_, i) => i !== skinIndex));
      toast({ title: `+${skin.sellPrice} монет`, description: `${skin.name} продан` });
    }
  };

  const handleWithdraw = () => {
    const message = encodeURIComponent(`Вывод средств\n\nМонеты: ${balance}\nID: ${playerId}\nНик: ${playerNick}`);
    window.open(`https://t.me/79043748313?text=${message}`, '_blank');
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'text-purple-500';
      case 'common': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
        <Toaster />
        <Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm border-primary/30 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-primary">SKINS</span>
              <span className="text-secondary">FARM</span>
            </h1>
            <p className="text-muted-foreground">Добро пожаловать в мир скинов!</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="photo" className="text-base font-semibold mb-2 block">
                📸 Фото профиля Standoff 2
              </Label>
              <Input
                id="photo"
                placeholder="Вставьте URL фото"
                value={playerPhoto}
                onChange={(e) => setPlayerPhoto(e.target.value)}
                className="bg-background"
              />
            </div>

            <div>
              <Label htmlFor="id" className="text-base font-semibold mb-2 block">
                🆔 ID игрока
              </Label>
              <Input
                id="id"
                placeholder="Введите ваш ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                className="bg-background"
              />
            </div>

            <div>
              <Label htmlFor="nick" className="text-base font-semibold mb-2 block">
                👤 Никнейм
              </Label>
              <Input
                id="nick"
                placeholder="Введите ваш ник"
                value={playerNick}
                onChange={(e) => setPlayerNick(e.target.value)}
                className="bg-background"
              />
            </div>

            <Button 
              onClick={handleRegister}
              className="w-full bg-primary hover:bg-primary/80 text-lg py-6"
            >
              <Icon name="UserCheck" size={20} className="mr-2" />
              Найти игрока
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold">
                <span className="text-primary">SKINS</span>
                <span className="text-secondary">FARM</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Card className="px-4 py-2 bg-card/80 border-primary/30">
                <div className="flex items-center gap-2">
                  <Icon name="Coins" size={20} className="text-secondary" />
                  <span className="font-bold text-lg">{balance.toFixed(2)}</span>
                </div>
              </Card>
              <Avatar className="border-2 border-primary">
                {playerPhoto ? (
                  <AvatarImage src={playerPhoto} alt={playerNick} />
                ) : (
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {playerNick.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto bg-card border border-border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ListTodo" size={18} className="mr-2" />
              Задания
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Магазин
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Package" size={18} className="mr-2" />
              Инвентарь
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border hover-glow border-primary/30">
                <div className="text-center space-y-4">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-primary">
                    {playerPhoto ? (
                      <AvatarImage src={playerPhoto} alt={playerNick} />
                    ) : (
                      <AvatarFallback className="bg-primary/20 text-primary text-3xl">
                        {playerNick.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{playerNick}</h2>
                    <p className="text-muted-foreground">ID: {playerId}</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Badge className="bg-primary/20 text-primary border-primary/50">Standoff 2</Badge>
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
                    <span className="text-muted-foreground">Баланс</span>
                    <span className="font-bold text-xl text-secondary">{balance.toFixed(2)} 💰</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Заданий выполнено</span>
                    <span className="font-bold text-xl">{completedTasks.length}/{tasks.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Скинов куплено</span>
                    <span className="font-bold text-xl">{inventory.length}</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => setPromoDialogOpen(true)}
                className="bg-accent hover:bg-accent/80 text-lg py-6"
              >
                <Icon name="Gift" size={20} className="mr-2" />
                Промокоды
              </Button>
              <Button 
                onClick={handleWithdraw}
                className="bg-secondary hover:bg-secondary/80 text-lg py-6"
              >
                <Icon name="Send" size={20} className="mr-2" />
                Вывод средств
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card className="p-6 bg-card border-border hover-glow border-accent/30">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Target" className="text-accent" />
                Выполните задания и получите монеты
              </h3>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{task.icon}</div>
                      <div>
                        <p className="font-bold text-lg">{task.title}</p>
                        <p className="text-sm text-muted-foreground">Награда: +{task.reward} монет</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleTaskComplete(task.id, task.reward, task.link)}
                      disabled={completedTasks.includes(task.id)}
                      className={completedTasks.includes(task.id) ? 'bg-secondary/50' : 'bg-primary hover:bg-primary/80'}
                    >
                      {completedTasks.includes(task.id) ? (
                        <>
                          <Icon name="Check" size={18} className="mr-2" />
                          Выполнено
                        </>
                      ) : (
                        <>
                          <Icon name="Play" size={18} className="mr-2" />
                          Выполнить
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
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
                      <p className="text-sm text-muted-foreground">Standoff 2</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-secondary">{skin.price} 💰</span>
                    </div>
                    <Button 
                      onClick={() => handleBuySkin(skin)}
                      className="w-full bg-primary hover:bg-primary/80"
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Купить
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            {inventory.length === 0 ? (
              <Card className="p-12 bg-card border-border text-center">
                <Icon name="Package" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">Инвентарь пуст</h3>
                <p className="text-muted-foreground mb-4">Купите свой первый скин в магазине</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.map((skin, index) => (
                  <Card key={index} className="p-0 bg-card border-border overflow-hidden hover-glow group">
                    <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                      <div className="text-7xl group-hover:scale-110 transition-transform">{skin.image}</div>
                      <Badge className={`absolute top-3 right-3 ${getRarityColor(skin.rarity)} bg-background/80`}>
                        {skin.rarity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg">{skin.name}</h3>
                        <p className="text-sm text-muted-foreground">Цена продажи: {skin.sellPrice} 💰</p>
                      </div>
                      <Button 
                        onClick={() => handleSellSkin(index)}
                        className="w-full bg-accent hover:bg-accent/80"
                      >
                        <Icon name="Tag" size={18} className="mr-2" />
                        Продать
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={promoDialogOpen} onOpenChange={setPromoDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl">🎁 Активировать промокод</DialogTitle>
            <DialogDescription>
              Введите промокод для получения монет
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              placeholder="Введите промокод"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="text-lg"
            />
            <Button 
              onClick={handlePromoActivate}
              className="w-full bg-primary hover:bg-primary/80"
            >
              Активировать
            </Button>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Доступные промокоды:</p>
              <p>START10, WELCOME25, BONUS50, MEGA90</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;