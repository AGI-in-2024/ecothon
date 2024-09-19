'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Leaf, CalendarIcon, Award, Bookmark, MapPin, Clock, Recycle, Droplet, Zap, Users } from 'lucide-react'

export default function UserAccountPage() {
  const user = {
    name: "Анна Иванова",
    username: "eco_anna",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Энтузиаст экологии и защитник окружающей среды",
    location: "Москва",
    joinDate: "Январь 2023",
    eventsAttended: 15,
    upcomingEvents: 3,
    ecoPoints: 750,
    level: 3,
    nextLevelPoints: 1000,
  }

  const upcomingEvents = [
    { id: 1, name: "Субботник в парке", date: "15 июня", type: "Волонтерство" },
    { id: 2, name: "Лекция о переработке", date: "20 июня", type: "Образование" },
    { id: 3, name: "Эко-фестиваль", date: "25 июня", type: "Мероприятие" }
  ]

  const ecoActivities = [
    { id: 1, name: "Сдача вторсырья", date: "10 июня", points: 50 },
    { id: 2, name: "Участие в субботнике", date: "5 июня", points: 100 },
    { id: 3, name: "Посещение эко-лекции", date: "1 июня", points: 30 }
  ]

  const communities = [
    { id: 1, name: "Эко-волонтеры Москвы", members: 1200 },
    { id: 2, name: "Зеленый город", members: 850 },
    { id: 3, name: "Велосипедисты Подмосковья", members: 650 }
  ]

  return (
    <div className="container mx-auto p-4 space-y-6 bg-cyan-50">
      <Card className="bg-white border-cyan-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-cyan-300">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center md:text-left flex-grow">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-cyan-800">{user.name}</h1>
                <Badge variant="outline" className="text-lg bg-cyan-100 text-cyan-800 border-cyan-300">Уровень {user.level}</Badge>
              </div>
              <p className="text-cyan-600">@{user.username}</p>
              <p className="text-cyan-700">{user.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="bg-cyan-100 text-cyan-800"><MapPin className="w-4 h-4 mr-1" />{user.location}</Badge>
                <Badge variant="secondary" className="bg-cyan-100 text-cyan-800"><Clock className="w-4 h-4 mr-1" />С нами с {user.joinDate}</Badge>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-cyan-700">Прогресс до следующего уровня</span>
              <span className="text-sm text-cyan-600">{user.ecoPoints} / {user.nextLevelPoints}</span>
            </div>
            <Progress value={(user.ecoPoints / user.nextLevelPoints) * 100} className="h-2 bg-cyan-100"  />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-cyan-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-200 data-[state=active]:text-cyan-800">Обзор</TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-cyan-200 data-[state=active]:text-cyan-800">События</TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-cyan-200 data-[state=active]:text-cyan-800">Достижения</TabsTrigger>
          <TabsTrigger value="ecoimpact" className="data-[state=active]:bg-cyan-200 data-[state=active]:text-cyan-800">Эко-влияние</TabsTrigger>
          <TabsTrigger value="communities" className="data-[state=active]:bg-cyan-200 data-[state=active]:text-cyan-800">Сообщества</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border-cyan-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-800">Посещено событий</CardTitle>
                <CalendarIcon className="h-4 w-4 text-cyan-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-700">{user.eventsAttended}</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-cyan-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-800">Эко-баллы</CardTitle>
                <Leaf className="h-4 w-4 text-cyan-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-700">{user.ecoPoints}</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-cyan-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-800">Предстоящие события</CardTitle>
                <Bookmark className="h-4 w-4 text-cyan-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-700">{user.upcomingEvents}</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-cyan-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-800">Уровень</CardTitle>
                <Award className="h-4 w-4 text-cyan-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-700">{user.level}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="bg-white border-cyan-200">
              <CardHeader>
                <CardTitle className="text-cyan-800">Последние эко-активности</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {ecoActivities.map((activity) => (
                    <div key={activity.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-cyan-700">{activity.name}</h4>
                        <Badge className="bg-cyan-100 text-cyan-800">+{activity.points} баллов</Badge>
                      </div>
                      <p className="text-sm text-cyan-600">{activity.date}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="bg-white border-cyan-200">
              <CardHeader>
                <CardTitle className="text-cyan-800">Предстоящие события</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-cyan-700">{event.name}</h4>
                        <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-300">{event.type}</Badge>
                      </div>
                      <p className="text-sm text-cyan-600">{event.date}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <Card className="bg-white border-cyan-200">
            <CardHeader>
              <CardTitle className="text-cyan-800">Календарь событий</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-cyan-600">Здесь будет отображаться календарь событий.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements">
          <Card className="bg-white border-cyan-200">
            <CardHeader>
              <CardTitle className="text-cyan-800">Мои достижения</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-cyan-600">Здесь будут отображаться ваши достижения и значки.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ecoimpact">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-800">
                  <Recycle className="mr-2 h-4 w-4 text-cyan-600" />
                  Углеродный след
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-700">5.2 т CO₂/год</div>
                <p className="text-sm text-cyan-600">На 20% меньше среднего</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-800">
                  <Droplet className="mr-2 h-4 w-4 text-cyan-600" />
                  Водный след
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-700">120 л/день</div>
                <p className="text-sm text-cyan-600">На 15% меньше среднего</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-800">
                  <Zap className="mr-2 h-4 w-4 text-cyan-600" />
                  Энергопотребление
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-700">250 кВтч/месяц</div>
                <p className="text-sm text-cyan-600">На 10% меньше среднего</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communities">
          <Card className="bg-white border-cyan-200">
            <CardHeader>
              <CardTitle className="text-cyan-800">Мои сообщества</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {communities.map((community) => (
                  <div key={community.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-cyan-700">{community.name}</h4>
                      <Badge className="bg-cyan-100 text-cyan-800">
                        <Users className="w-4 h-4 mr-1" />
                        {community.members}
                      </Badge>
                    </div>
                    <Button variant="outline" className="mt-2 text-cyan-600 border-cyan-300 hover:bg-cyan-50">
                      Присоединиться
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}